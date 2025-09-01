const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20,
    };
    
    const perKmRates = {
        car: 15,
        auto: 10,
        motorcycle: 5,
    };

    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        motorcycle: 1,
    };

    console.log(distanceTime);

    const distance = distanceTime.distance.value / 1000; // convert to km
    const time = distanceTime.duration.value / 60; // convert to minutes

    const fare = {
        car: baseFare.car + distance * perKmRates.car + time * perMinuteRate.car,
        auto: baseFare.auto + distance * perKmRates.auto + time * perMinuteRate.auto,
        motorcycle: baseFare.motorcycle + distance * perKmRates.motorcycle + time * perMinuteRate.motorcycle,
    };

    return fare;
}

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(0, 10**num).toString().padStart(num, '0');
        return otp;
    }
    return generateOtp(num);
}



module.exports.createRide = async (user,pickup,destination,vehicleType) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All parameters are required to create a ride');
    }
    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vehicleType],
       
       
    });
    return ride;
}



