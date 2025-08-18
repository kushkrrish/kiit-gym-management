const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const gymRouter = require('./gymRoutes');
const memRouter = require("./memRoutes");
const gymChangeRouter = require("./gymChangeRoutes");
const adminRouter=require("./adminRoutes");
const complaintRouter=require("./complaintRoutes");

router.use('/user', userRouter);
router.use('/gym', gymRouter)
router.use('/membership', memRouter);
router.use('/gymChangeRequest', gymChangeRouter);
router.use('/admin',adminRouter);
router.use('/complaint',complaintRouter);

module.exports = router;