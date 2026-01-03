// Backend/controllers/ride.controller.js

const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const rideModel = require("../models/ride.model");

// ✅ use BROADCAST (debug) so popup must come if socket is connected
const { sendMessageToAll, sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    // ✅ Create ride in DB
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // ✅ Respond immediately
    res.status(201).json(ride);

    // ✅ DEBUG: broadcast to everyone (captain popup should come for sure)
    try {
      const rideWithUser = await rideModel
        .findById(ride._id)
        .populate("user", "fullName email socketId");

      console.log("✅ Broadcasting new-ride to EVERYONE (debug)");
      sendMessageToAll("new-ride", rideWithUser);
    } catch (notifyErr) {
      console.log("⚠️ Broadcast new-ride failed:", notifyErr.message);
    }
  } catch (error) {
    console.log("❌ createRide FAILED:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);

    // ✅ if socketId missing, log it (helps debugging)
    if (!ride?.user?.socketId) {
      console.log("⚠️ User socketId missing for ride:", ride?._id);
    } else {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride, // ✅ contains captain + vehicle + user.socketId
      });
    }

    return res.status(200).json({ message: "Ride confirmed", ride });
  } catch (err) {
    console.log("❌ confirmRide FAILED:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

    if (ride?.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-started",
        data: ride,
      });
    }

    return res.status(200).json({ message: "Ride started successfully", ride });
  } catch (err) {
    console.log("❌ startRide FAILED:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    if (ride?.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-ended",
        data: ride,
      });
    }

    return res.status(200).json({ message: "Ride ended successfully", ride });
  } catch (err) {
    console.log("❌ endRide FAILED:", err.message);
    return res.status(500).json({ error: err.message });
  }
}