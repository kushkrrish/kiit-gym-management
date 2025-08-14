const express=require("express");
const router=express.Router();
const userRouter=require("./userRouter");
const gymRouter=require('./gymRoutes');
router.use('/user',userRouter);
router.use('/gym',gymRouter)
module.exports=router;