const gymRepositiory=require("../repositiory/gymRepo");

const gymRepo=new gymRepositiory();

async function createGym(data) {
    try {
        const gym=gymRepo.createGym(data);
        return gym;
    } catch (error) {
        throw error;
    }
}

async function findGym() {
    try {
        const gym=await gymRepo.findGym();
        const gyms=[...gym]
        // console.log(gyms)
        return gyms;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    createGym,
    findGym
}