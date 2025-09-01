const dotenv=require('dotenv')
dotenv.config()


const express=require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser');

const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');


const app=express()
app.use(cors({ 
    origin: "http://localhost:5173", // your React app
    credentials: true
  }))

connectToDb();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

app.get("/",(req,res)=>{
    res.send("hello world")
})




module.exports=app