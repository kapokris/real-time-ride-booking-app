const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({ fullName, email, password, vehicle }) => {
  if (!fullName?.firstname || !email || !password || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
    throw new Error("Please provide all required fields");
  }

  const captain = await captainModel.create({
    fullName,
    email,
    password,
    vehicle,
    status: "inactive",
  });

  return captain;
};

module.exports.getCaptainByEmail = async (email) => captainModel.findOne({ email });
module.exports.getCaptainById = async (id) => captainModel.findById(id);
