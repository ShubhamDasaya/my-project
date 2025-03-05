import express from 'express'
import { createTask ,deleteData,getTask, updateTask} from '../controller/TaskController.js';
const router = express.Router();

router.post("/",createTask);
router.get("/",getTask);
router.delete('/:id',deleteData);
router.post("/:id",updateTask)

export default router;