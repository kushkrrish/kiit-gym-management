const User = require("../models/user");

class userRepo{
    async createUser(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async getUsers(){
        try {
            const users=await User.find({});
            return users;
        } catch (error) {
            console.log(error);
        }
    }
    async getUser(id){
        try {
            const user=await User.findById(id);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteUser(id){
        try {
            const user=await User.findByIdAndDelete(id);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByEmail(email){
        try {
            const user=await User.findOne({email:email});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getUserByRollNo(rollNo){
        try {
            const user=await User.findOne({rollNo:rollNo});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports=userRepo;