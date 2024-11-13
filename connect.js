const mongoose=require('mongoose');

const connectdB= async(url)=>{
   return mongoose.connect(url).then(()=>{
        console.log('MongoDb conected successfully...');
    }).catch(()=>{
        console.log('Failed to coennected MongoDb..');
    })
}

module.exports=connectdB;