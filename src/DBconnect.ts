import mongoose = require("mongoose");
import { ConnectOptions } from "mongoose";

//  Config for Mongo atlas connection string variables
export const dbUserName = "erk";
export const dbUserPassword = "hgjM69hNKYTzaR4";
export const dbDBName = "cargoDB";

const connectionString =
  "mongodb+srv://" +
  dbUserName +
  ":" +
  dbUserPassword +
  "@cluster0.dtvlw.mongodb.net/" +
  dbDBName +
  "?retryWrites=true&w=majority";

export function DBconnect(): void {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      connectionString,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
      () => console.log(" Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
}
