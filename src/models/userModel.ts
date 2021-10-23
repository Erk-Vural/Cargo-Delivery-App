import mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const User = mongoose.model("user", userSchema, "user");
