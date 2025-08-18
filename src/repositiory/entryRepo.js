const Entry = require("../models/entrySchema");

class entryRepo{
    async createEntry(data){
        try {
            const entry= await Entry.create(data);
            return entry;
        } catch (error) {
            throw error;
        }
    }
    async findExistEntry(membershipId,date){
        try {
            const entry=await Entry.findOne({
                 membershipId:membershipId,
                 date:date
            })
            return entry;
        } catch (error) {
            throw error;
        }
    }
}

module.exports=entryRepo;