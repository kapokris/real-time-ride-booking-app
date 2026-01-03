const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { ltd: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "ZERO_RESULTS") {
        throw new Error(
          "No route could be found between the origin and destination."
        );
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error(`Distance Matrix error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
    throw new Error("Input is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    throw error;
  }}
  module.exports.getCaptainsInTheRadius = async (ltd,lng,radius) => { 
    const captain = await captainModel.find({
    location : {
      $geoWithin: {
        $centerSphere: [ [ lng, ltd ], radius / 6371 ] // radius in radians
      }
    }
  });
    return captain;
  }