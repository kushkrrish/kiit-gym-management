const entryRepositiory=require("../repositiory/entryRepo");
const memRepositiory=require("../repositiory/membershipRepo");
const userRepository=require("../repositiory/userRepo");

const entryRepo=new entryRepositiory();
const memoRepo=new memRepositiory();
const userRepo=new userRepository();
async function createEntry(payload) {
    try {
        console.log(payload);
        // const payload=await JSON.parse(payload);
        // console.log("payload:",payload);
        const membership=await memoRepo.findMembershipById(payload.membershipId);
        const user=await userRepo.getUserByRollNo(payload.rollNo);
        console.log("membership");
        if(!membership || membership.status!=="approved"){
            throw "invalid membership"
        }
         const today = new Date().toISOString().split("T")[0];
        // if (payload.date !== today ){
        //     throw "Expired/Invalid QR";
        // }
        console.log("creating enty");
        const existEntry=await entryRepo.findExistEntry(membership._id,today);
        if(existEntry){
            throw new Error("entry exist already");
        }
        const entry =await entryRepo.createEntry({
            membershipId: membership._id,
            userEmail:user.email,
            rollNo:membership.rollNo,
            gymId:membership.gymId,
            date:today
        });
         console.log("created enty");
        return entry;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    createEntry
}