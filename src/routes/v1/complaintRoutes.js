const express=require("express");
const router=express.Router();
const authVerification=require("../../middleware/authVerification")
const complaintController=require("../../controller/complaintController");

router.post('/',authVerification(["student"]),complaintController.createComplaint);
router.get('/',complaintController.findComplaints);
router.get('/:rollNo',complaintController.findComplaintByRollNO);
router.patch('/update',authVerification(["admin"]),complaintController.complaintResolve);

module.exports=router;