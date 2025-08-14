const memRepositiory=require('../repositiory/membershipRepo');

const memoRepo=new memRepositiory();

async function createMembership(data) {
    try {
        const mem=memoRepo.createMembership(data);
        return mem;
    } catch (error) {
        throw error;
    }
}

async function findMembership() {
    try {
        const mem=memoRepo.findMembership();
        return mem;
    } catch (error) {
        throw error;
    }
}

async function findMembershipByRollNo(rollNo) {
    try {
        const mem=memoRepo.findMembershipByRollNo(rollNo);
        return mem;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createMembership,
    findMembership,
    findMembershipByRollNo
}