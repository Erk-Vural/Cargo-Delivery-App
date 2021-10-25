import mongoose = require("mongoose");

const courrierSchema = new mongoose.Schema({
  lat: String,
  lng: String,
});

export const Courrier = mongoose.model("courrier", courrierSchema, "courrier");
