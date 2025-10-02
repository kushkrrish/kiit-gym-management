const GymChange = require("../models/gymchangeSchema");

class GymChangeRepo{
    async createRequest(data){
        try {
            const request=await GymChange.create(data);
            return request;
        } catch (error) {
            throw error;
        }
    }

    async findRequests(){
        try {
            const requests=await GymChange.find();
            return requests;
        } catch (error) {
            throw error;
        }
    }
    async findRequestById(rollNo){
        try {
            const request=await GymChange.find({userId:rollNo});
            return request;
        } catch (error) {
            throw error;
        }
    }
    async updateRequest(id,newStatus){
        try {
            const updatedRequest=await GymChange.findByIdAndUpdate(
                id,
                {status:newStatus},
                {new:true}
                
            )
            return updatedRequest;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports=GymChangeRepo;