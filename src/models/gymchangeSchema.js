const mongoose = require("mongoose");

const GymChangeRequestSchema = new mongoose.Schema({
    description: {
        type: String,
        require:true
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

