const Gym = require("../models/gymSchema");

class gymRepo{
    async createGym(data){
        try {
            const gym=await Gym.create(data);
            return gym
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findGym(){
        try {
            const gyms=await Gym.find();
            return gyms;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findGymById(id){
        try {
            const gym=await Gym.findOne({gymId:id});
            return gym;
        } catch (error) {
            
        }
    }
}
module.exports=gymRepo