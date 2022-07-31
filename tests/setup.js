const {connectToMongo} = require('../connectDb');
const keys = require('../config/keys');
require('../models/User');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
(async()=>{
    const result = await connectToMongo();
    // console.log(result);
})();
// await connectToMongo();