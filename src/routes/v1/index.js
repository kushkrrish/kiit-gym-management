const express=require("express");
const router=express.Router();
const userRouter=require("./userRouter");
const gymRouter=require('./gymRoutes');
const memRouter=require("./memRoutes");
router.use('/user',userRouter);
router.use('/gym',gymRouter)
router.use('/membership',memRouter);
module.exports=router;