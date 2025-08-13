const express=require("express");
const router=express.Router();
const userController=require("../../controller/userController");
router.get('/ping',()=>{
    console.log("pong");
    return "pong"
})
router.post('/signup',userController.createUser);
router.post('/signin',userController.signin);

module.exports=router