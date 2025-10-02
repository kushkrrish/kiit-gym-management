const mongoose = require("mongoose");

const GymChangeRequestSchema = new mongoose.Schema({
    description: {
        type: String,
        
    },
    userId: {
        type: String,
        ref: "User",
    },

    oldGymId: {
        type: String,
        ref: "Gym"
    },
    newGymId: {
        type: String,
        ref: "Gym"
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
});

const GymChange = mongoose.model("GymChange", GymChangeRequestSchema);
module.exports = GymChange;

