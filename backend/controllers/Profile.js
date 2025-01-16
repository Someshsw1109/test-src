import User from "../models/User.js"


const deleteAccount=async(req,res)=>{
    try{
        // get id-kyuki wo login hai to id nikal skte hai uski.
        const id=req.user.id;
        // validation
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found",
            })
        }
        // delete profile
        // await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // delete user
        await User.findByIdAndDelete({_id:id});

        // return response
        return res.status(200).json({
            success:true,
            message:"account deleted successfully",
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"user cannot be deleted,error",
        })
    }
}
export {deleteAccount}
