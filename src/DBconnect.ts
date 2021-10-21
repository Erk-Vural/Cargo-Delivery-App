import mongoose = require("mongoose");
import { ConnectOptions } from "mongoose";

const connectionString =
  "mongodb+srv://erk:hgjM69hNKYTzaR4@cluster0.dtvlw.mongodb.net/cargoDB?retryWrites=true&w=majority";


export function DBconnect():void {
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