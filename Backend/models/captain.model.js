const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstname: { type: String, required: true, minLength: 3 },
    lastname: { type: String, minLength: 3 },
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  socketId: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  vehicle: {
    color: { type: String, required: true },
    plate: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    vehicleType: { type: String, required: true, enum: ["car", "motorcycle", "auto"] },
  },
  location: { ltd: Number, lng: Number },
});

// Instance methods
captainSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Static method for hashing
captainSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Captain", captainSchema);
