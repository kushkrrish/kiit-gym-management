const Membership = require("../models/membershipSchema");

class membershipRepo{
    async createMembership(data){
        try {
            const mem=Membership.create(data);
            return mem;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findMembership(){
        try {
            const mem=Membership.find();
            return mem;
        } catch (error) {
            throw error;
        }
    }
    async findMembershipByRollNo(rollNo){
        try {
            const mem=Membership.findOne({rollNo:rollNo});
            return mem;
        } catch (error) {
            throw error;

        }
    }

    async updateGymId(userId,newId){
        try {
            const updated=Membership.findOneAndUpdate(
                {rollNo:userId},
                {gymId:newId},
                {new:true}
            );
            return updated
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
module.exports=membershipRepo