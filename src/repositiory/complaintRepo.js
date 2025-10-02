const Complaint=require("../models/complaintSchema");

class complaintRepo{
    async createComplaint(data){
        try {
            const comp=await Complaint.create(data);
            return comp;
        } catch (error) {
            throw error;
        }
    }
    async findComplaintByRollNo(rollNo){
        try {
            const comp=await Complaint.find({userId:rollNo});
            return comp;
        } catch (error) {
            throw error
        }
    }
    async findComplaints(){
        try {
           const complaints=await Complaint.find();
           return complaints; 
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(complaintId,newStatus){
        try {
            const complaint=await Complaint.findByIdAndUpdate(
                complaintId,
                {status:newStatus},
                {new:true}
            )
            return complaint;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=complaintRepo