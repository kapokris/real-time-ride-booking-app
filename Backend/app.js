const dotenv=require('dotenv')
dotenv.config()

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');



const express=require('express')
const cors=require('cors')
const app=express()
const connectToDb = require('./db/db')
connectToDb();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello world")
})




module.exports=app