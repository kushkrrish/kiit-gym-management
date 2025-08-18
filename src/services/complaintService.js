const complaintRepositiory=require("../repositiory/complaintRepo");
const complaintRepo=new complaintRepositiory();

async function createComplaint(data) {
    try {
        const complaint=await complaintRepo.createComplaint(data);
        return complaint;
    } catch (error) {
        throw error
    }
}

async function findComplaints() {
    try {
        const complaint=await complaintRepo.findComplaints();
        return complaint;
    } catch (error) {
        throw error;
    }
}

async function findComplaintByRollNO(rollNo) {
    try {
        const complaint=await complaintRepo.findComplaintByRollNo(rollNo);
        return complaint;
    } catch (error) {
        throw error;
    }
}

async function complaintResolve(data) {
    try {
        const updateComplaint=await complaintRepo.updateStatus(data.complaintId,data.status);
        return updateComplaint
    } catch (error) {
        throw error
    }
}


module.exports={
    createComplaint,
    findComplaintByRollNO,
    findComplaints,
    complaintResolve
}