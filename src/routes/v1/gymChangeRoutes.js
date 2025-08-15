const express=require("express");
const gymChangeController=require('../../controller/gymChangeController');
const router=express.Router();

router.post('/create',gymChangeController.createRequest);
router.get('/',gymChangeController.findRequests);
router.get('/:rollNo',gymChangeController.findRequestById);
router.patch('/update',gymChangeController.approveRequest);
module.exports=router;