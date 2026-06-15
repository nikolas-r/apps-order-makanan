import mongoose from "mongoose"

export const connectDB = async ()=>{
    if(mongoose.connection.readyState >= 1 ){
        return;
    }

    const uri = process.env.MONGODB_URI

    if(!uri){
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB successfully");
    }catch(err){
        console.log("Error connecting to MongoDB:", err);
    }
}