const express=require("express");
const router=express.Router();

const complaintController=require("../../controller/complaintController");

router.post('/',complaintController.createComplaint);
router.get('/',complaintController.findComplaints);
router.get('/:rollNo',complaintController.findComplaintByRollNO);
router.patch('/update',complaintController.complaintResolve);

module.exports=router;