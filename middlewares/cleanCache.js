const {clearCache}= require('../services/cache');

module.exports = async (req, res, next)=>{
    await next();
    console.log("cache cleared");
    clearCache(req.user.id);
}
