const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectToMongo(){
  if(process.env.NODE_ENV === 'ci'){
    const result = await mongoose.connect('mongodb://127.0.0.1:27017/blog_ci').then(res => {console.log("Project Blog_CI connected")}).catch(error => {
        console.log(error);
        return error;
    });
    return result;
  }else{
    const result = await mongoose.connect('mongodb+srv://rajat_veggi1304:' + process.env.MONGO_ATLAS_PW + '@veggies.znzgp.mongodb.net/blog-dev?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(
        result=>{
            console.log("Project blog-dev connected");
            // return "Project Silver Connected"
        }
    ).catch(error=>{
        console.log(error);
        return error;
    });
    return result;
  }
  
}
module.exports={connectToMongo};