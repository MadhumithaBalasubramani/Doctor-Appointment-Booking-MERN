const express=require('express');
const cors = require('cors');
const router = require("./Routes/userRoutes")
const routersAdmin=require('./Routes/adminRoutes')
const routedoc=require('./Routes/doctorRoutes')
// const routerDoc =require('../serverBackend/Routes/doctorRoutes')
const connect=require('./Common/connection');
const dotenv = require("dotenv");
const app=express();
dotenv.config()
app.use(express.json());
app.use(cors());
app.use(router);
app.use(routersAdmin);
app.use(routedoc)
connect();
const port=process.env.PORT||8000;  
app.listen(port,() => console.log("server running on ", port))
