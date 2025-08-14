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
        const gyms=gymRepo.findGym();
        return gyms;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createGym,
    findGym
}