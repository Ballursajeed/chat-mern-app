import mongoose from "mongoose";

export const connectDB = async() => {
try {
 const MongoDB = await mongoose.connect(process.env.MONGO_URI)
 console.log("mongoDB connected!! on host:",MongoDB.connection.host);
 }
 catch (err) {
   console.log("Error while mongoDB connection!!");
   throw new Error("MongoDB connection error:", err)
 }
}