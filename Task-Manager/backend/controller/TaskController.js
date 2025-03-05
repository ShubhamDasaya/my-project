import Task from "../models/TaskModel.js";

export const createTask =async (req,res)=>{
    try {
      const data = req.body;
    const model = new Task(data);
    await model.save();
    return res.status(200).json({message:"Task is created ", seccess:true})
    } catch (error) {
       return res.status(500).json({error:"Failed to create Task",success:false}) 
    }
}

 export const getTask = async (req,res)=>{
    try {
        const data = await Task.find();
        if(!data) return res.status(404).json({message:"Data is not found "});
        res.status(200).json({success:true , data})
    } catch (error) {
        return res.status(500).json({error:"Failed to fatech Task",success:false}) 

    }
 }

 export const updateTask = async (req,res)=>{
    try {
         const {id} = req.params;
         const data = req.body;
          
         const updatedata = await Task.findByIdAndUpdate(id,{$set:data},{new:true});
        if(!updatedata)return res.status(404).json({message :'Task is not update',success:false})
            return res.status(200).json({message:"task is update",success:true})
    } catch (error) {
        return res.status(500).json({error:"Failed to fatech Task",success:false}) 
 
    }
 }

export const deleteData = async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteData = await Task.findByIdAndDelete(id);
        if(!deleteData)return res.status(404).json({message:"task is not Deleted"});
        return res.status(200).json({message:"task is Delete",success:true})

    } catch (error) {
        return res.status(500).json({error:"Failed to fatech Task",success:false}) 

    } 
 }