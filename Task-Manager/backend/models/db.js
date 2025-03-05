import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const mdb = process.env.DB_M;

mongoose.connect(mdb)
.then(()=>{
    console.log("Data base is Connected ");})
.catch((err)=>{
 console.log("Data base is not connected due to->",err);
 
})

export default mdb;