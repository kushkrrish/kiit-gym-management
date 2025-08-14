const express=require("express");
const memController=require("../../controller/memController");
const router=express.Router();

router.post('/create',memController.createMembership);
router.get('/',memController.findMembership);
router.get('/:rollNo',memController.findMembershipByRollNo);

module.exports=router