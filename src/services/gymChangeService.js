const gymRepositiory = require("../repositiory/GymChangeRepo");
const memRepositiory=require('../repositiory/membershipRepo');

const memoRepo=new memRepositiory();
const gymRepo = new gymRepositiory();

async function createRequest(data) {
    try {
        const request = await gymRepo.createRequest(data);
        return request;
    } catch (error) {
        throw error;
    }
}

async function findRequests() {
    try {
        const requests = await gymRepo.findRequests();
        return requests;
    } catch (error) {
        throw error;
    }
}

async function findRequestById(_id) {
    try {
        const request = await gymRepo.findRequestById(_id);
        return request;
    } catch (error) {
        throw error;
    }
}

async function approveRequest(data) {
    try {
        /*
            1-fetch request
            2- request approved or reject
                2.1-update the status of request
                2.2-update in membership of that user if approved
        */
        
        const updatedRequest=await gymRepo.updateRequest(data._id,data.status);
        if(!updatedRequest){
            throw "not getting updated request"
        }
        if(updatedRequest.status==="Approved"){
            const updatedGymId=await memoRepo.updateGymId(data.userId,updatedRequest.newGymId);
            return updatedGymId;
        }
        if(updatedRequest.status==="Rejected"){
            const msg={msg:"gym change request got rejected"};
            return msg;
        }
    } catch (error) {
            console.log(error)
            throw error;
    }
}

module.exports = {
    createRequest,
    findRequests,
    findRequestById,
    approveRequest
}

