import mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema({
    clientName: String,
    locationX: String,
    locationY: String,
  });
  
export const Cargo = mongoose.model("cargo", cargoSchema, "cargo");
  