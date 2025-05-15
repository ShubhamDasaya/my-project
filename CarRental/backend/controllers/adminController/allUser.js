
import User from "../../models/adminModel/dataTables.js";


// all user data 
export const getAllUser = async (request,response)=>{
        try {
            const users = await User.findAll();
            if(users.length==0){
                return response.status(404).json({error:"User not found"});
            }
           return response.status(200).json({users});
        } catch (error) {
            console.log(error);
            return response.status(500).json({error:"Failed to fetch users"})
        }
}

// get user by id 
export const getAllUserById = async (request,response)=>{
    try {
        const { user_id } = request.params;
        const user = await User.findByPk(user_id);

        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }
        return response.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Failed to fetch users"})
    }
}

// get suppend by Admin 

export const suspendUser = async (request,response)=>{
    try {
    const {user_id} = request.params;
      const user =   await User.findByPk(user_id);
      if(!user){
        return response.status(404).json({error:"User not found "})
      }
      await user.update({status:"Suspended"})
      return response.status(200).json({messages:`Successfully suspended ${user.userName}`})

    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Failed to suspend user"})
    }
}
// un suspend user 
export const unSuspendUser = async (request,response)=>{
    try {
    const {user_id} = request.params;
      const user =   await User.findByPk(user_id);
      if(!user){
        return response.status(404).json({error:"User not found "})
      }
      await user.update({status:"Active"})
      return response.status(200).json({messages:`Successfully Active ${user.userName}`})

    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Failed to suspend user"})
    }
}
// Delete user by Admin

export const deleteUserbyAdmin  = async (requset,response)=>{
    try {
        const {user_id} = requset.params;
        const user = await findByPk(user_id);
        if(!user){
            return response.status(404).json({error:"User is not found "});
        }
        await user.distory();
        return response.status(200).json({messages:`Successfully Delete ${user.userName}`})
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Failed to delete user"})
        
    }
}