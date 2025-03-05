import express from 'express'
import dotenv from 'dotenv'
import mongoose from './models/db.js';
dotenv.config();
import taskRouter from './routers/TaskRouter.js'
const app = express();
app.use(express.json());


const port = 3000;

app.use("/task",taskRouter)

app.listen(port,()=>{
    console.log("Server is start on",port);

    
})


