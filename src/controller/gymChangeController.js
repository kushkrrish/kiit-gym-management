const { StatusCodes } = require('http-status-codes');
const gymChangeService = require('../services/gymChangeService');

async function createRequest(req, res) {
    try {
        const response = await gymChangeService.createRequest({
            description: req.body.description,
            userId: req.body.userId,
            oldGymId: req.body.oldGymId,
            newGymId: req.body.newGymId
        })
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error
        })
    }
}

async function findRequests(req, res) {
    try {
        const response = await gymChangeService.findRequests();
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error
        })
    }
}

async function findRequestById(req, res) {
    try {
        const response = await gymChangeService.findRequestById(req.params.rollNo);
        console.log(response);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error
        })
    }
}

async function approveRequest(req,res) {
    try {
        const response=await gymChangeService.approveRequest({
            _id:req.body._id,
            userId:req.body.userId,
            status:req.body.status,
        })
        return res.status(StatusCodes.OK).json({
            updated:true,
            success:true,
            data:response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            updated:false,
            success:false,
            error:error
        });
    }
}

module.exports = {
    createRequest, findRequests, findRequestById,approveRequest
}