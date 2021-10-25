import mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema({
  clientName: String,
  lat: String,
  lng: String,
  delivered: Boolean,
});

export const Cargo = mongoose.model("cargo", cargoSchema, "cargo");
