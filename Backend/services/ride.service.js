const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = { auto: 30, car: 50, motorcycle: 20 };
  const perKmRates = { auto: 10, car: 15, motorcycle: 5 };
  const perMinuteRate = { auto: 1.5, car: 2, motorcycle: 1 };

  const distance = distanceTime.distance.value / 1000; // km
  const time = distanceTime.duration.value / 60; // minutes

  return {
    auto: Math.round(baseFare.auto + distance * perKmRates.auto + time * perMinuteRate.auto),
    car: Math.round(baseFare.car + distance * perKmRates.car + time * perMinuteRate.car),
    motorcycle: Math.round(baseFare.motorcycle + distance * perKmRates.motorcycle + time * perMinuteRate.motorcycle),
  };
}

function getOtp(num) {
  return crypto.randomInt(0, 10 ** num).toString().padStart(num, "0");
}

/**
 * ✅ IMPORTANT: This now accepts an OBJECT (same as your controller sends)
 */
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All parameters are required to create a ride");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
    status: "pending",
  });

  return ride;
};

module.exports.getFare = getFare;

/**
 * ✅ FIXED confirmRide (your old one had captain undefined + ride variable wrong)
 */
module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID are required to confirm a ride");
  }

  const ride = await rideModel
    .findByIdAndUpdate(
      rideId,
      { status: "accepted", captain: captainId },
      { new: true }
    )
    // ✅ must include socketId so controller can emit to user
    .populate("user", "fullName email socketId")
    // ✅ must include captain details for user popup
    .populate("captain", "fullName vehicle").select("+otp");

  if (!ride) throw new Error("Ride not found");

  return ride;
};
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride ID, OTP and Captain are required to start a ride");
  }

  const ride = await rideModel
    .findById(rideId)
    .populate("user", "fullName email socketId")
    .populate("captain", "fullName vehicle")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "accepted") throw new Error("Ride not accepted yet");
  if (ride.otp !== otp) throw new Error("Invalid OTP");

  ride.status = "ongoing";
  await ride.save();

  return ride; // ✅ only return ride
};
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride ID and Captain are required to end a ride");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user", "fullName email socketId")
    .populate("captain", "fullName vehicle")
    .select("+otp");

  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "ongoing") throw new Error("Ride is not ongoing");

  await rideModel.findOneAndUpdate(
    { _id: rideId, captain: captain._id },
    { status: "completed" },
    
  );

  return ride; // ✅ only return ride
};