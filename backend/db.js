const mongoose=require('mongoose')
const mongoURI='mongodb://127.0.0.1:27017/iNoteBook'
const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI).then(()=>{
        console.log('connected to Mongo')

    }).catch(err=>console.log(err));

    
}
module.exports=connectToMongo;