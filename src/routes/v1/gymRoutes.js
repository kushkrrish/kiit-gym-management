const express=require("express");
const gymController=require("../../controller/gymController");
const router=express.Router();


router.post('/create',gymController.createGym);
router.get('/',gymController.findGym);

module.exports=router