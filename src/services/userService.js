const userRepository=require('../repositiory/userRepo');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { SECRET_KEY } = require('../config/serverConfig');

const userRepo=new userRepository();

async function createUser(data){
    try {
        const user=await userRepo.createUser(data);
        return user;
    } catch (error) {
        console.log(error);
    }
};

async function signin(data) {
    try {
        const userEmail=await userRepo.getUserByEmail(data.email);
        console.log(userEmail);
        if(!userEmail){
            throw ("user not found");
        }
        const compared=async function (userEmail,data) {
            await bcrypt.compare(userEmail.password,data.password);
        }
        if(!compared){
            throw ("invalid password");
        }
        const token=jwt.sign(data,SECRET_KEY,({expiresIn:'1h'}));
        return token;

    } catch (error) {
        throw error;
    }
}

module.exports={
    createUser,
    signin
}