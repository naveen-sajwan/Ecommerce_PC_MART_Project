import mongoose from "mongoose";

export default async function dbcon(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error("❌ DB Connection not established\n\n",error)
    }
}