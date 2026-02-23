const UserService = require("../services/auth-service")

const {StatusCodes} =require("http-status-codes")

const userService=new UserService()
const signup=async(req,res)=>{
    try {
        const response=await userService.signUp(req.body)
        return res.status(StatusCodes.OK).json({
            success:true,
            data:{response},
            message:"signedUp successfully",
            err:{}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            data:{},
            message:"signedUp failed",
            err: error
        })
    }
}

module.exports={
    signup
}