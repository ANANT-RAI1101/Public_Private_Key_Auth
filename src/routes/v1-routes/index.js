const express=require("express")
const UserController=require("../../controllers/auth-controller")

const router=express.Router()

router.post("/signup",UserController.signup)
router.post("/login",UserController.login)
router.post("/challenge",UserController.challenge)

module.exports=router