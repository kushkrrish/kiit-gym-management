const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const { PORT } = require("./config/serverConfig");
const dbConnect = require("./config/dbConfig");
const apiRouter=require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.use('/api',apiRouter);
app.get('/ping',()=>{
    return {ping:"pong"}
})

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
    dbConnect();
    
})

