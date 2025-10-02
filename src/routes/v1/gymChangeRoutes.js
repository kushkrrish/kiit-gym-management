const express=require("express");
const gymChangeController=require('../../controller/gymChangeController');
const authVerification=require("../../middleware/authVerification")
const router=express.Router();

router.post('/create',gymChangeController.createRequest);
router.get('/',gymChangeController.findRequests);
router.get('/:rollNo',gymChangeController.findRequestById);
router.patch('/update',authVerification(["admin"]),gymChangeController.approveRequest);
module.exports=router;