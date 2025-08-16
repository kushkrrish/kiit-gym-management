const dotenv=require("dotenv");

dotenv.config();

module.exports={
    PORT:process.env.PORT || 3000,
    ATLAS_DB_URL:process.env.ATLAS_DB_URL,
    SECRET_KEY:process.env.SECRET_KEY,
    RAZORPAY_KEY_SECRET:process.env.RAZORRPAY_KEY_SECRET,
    RAZORPAY_KEY_ID:process.env.RAZORPAY_KEY_ID
}