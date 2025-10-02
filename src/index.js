const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const { PORT } = require("./config/serverConfig");
const membershipQueue=require("./config/redisConfig")
const cors=require("cors");
const dbConnect = require("./config/dbConfig");
const apiRouter=require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(cors({
  origin: "http://localhost:3001", // frontend
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"], // ✅ allow headers
}));
app.use('/api',apiRouter);
app.get('/ping',()=>{
    return {ping:"pong"}
})

app.listen(PORT,async ()=>{
   
    console.log(`server started on port ${PORT}`);
    dbConnect();
    
})

