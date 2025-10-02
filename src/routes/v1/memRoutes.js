const express=require("express");
const memController=require("../../controller/memController");
const authVerification = require("../../middleware/authVerification");

const router=express.Router();

router.post('/create',authVerification(["student"]),memController.createMembership);
router.get('/',memController.findMembership);
router.get('/:rollNo',memController.findMembershipByRollNo);
router.get('/mem/:membershipId',memController.findMembershipById);
router.post('/verify-payment',authVerification(["student"]),memController.membershipVerification);

module.exports=router