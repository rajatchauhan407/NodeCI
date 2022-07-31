const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');
const redisUrl = keys.redisUrl;
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options={}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

mongoose.Query.prototype.exec = async function (){
    if(!this.useCache){
        return exec.apply(this,arguments);
    }
    console.log('I am about run a query !');
    const key = JSON.stringify(Object.assign({},this.getFilter(),{collection:this.mongooseCollection.name}));
    console.log(key);

    // See if we have a value for 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key);

    //  if we do, return that
    if(cacheValue){
        console.log("FROM CACHE");
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)? doc.map((d)=>{return new this.model(d)}): new this.model(doc);
    }
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey,key, JSON.stringify(result));
    return result;
}

module.exports = {
    clearCache(hashKey){
        client.del(JSON.stringify(hashKey));
    }
}