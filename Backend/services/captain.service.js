const captainModel= require("../models/captain.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) =>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {    
        throw new Error("Please provide all required fields");
    }
    const captain = await captainModel.create({
        fullName: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        },
        status:'inactive'
        
    });
    return captain;
    
}
    
    
