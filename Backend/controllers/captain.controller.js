const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullName, email, password, vehicle } = req.body;

  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) return res.status(400).json({ message: "Captain already exists" });

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    fullName,
    email,
    password: hashedPassword,
    vehicle
  });

  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

  const token = await captain.generateAuthToken();
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // Add your blacklist logic if needed
  res.status(200).json({ message: "Logged out successfully" });
};
