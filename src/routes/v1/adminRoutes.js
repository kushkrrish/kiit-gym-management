const express=require("express");
const router=express.Router();

const adminController=require("../../controller/adminController");

router.post('/scan-entry',adminController.createEntry);
module.exports=router;