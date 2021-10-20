import { app, BrowserWindow, ipcMain } from "electron";

import { createLoginWindow, checkUser, checkPassword } from "./login";

// Connect mongoose and create user model
import mongoose = require('mongoose');
import { ConnectOptions } from "mongoose";

const userSchema = new mongoose.Schema({
  username:String,
  password:String
});

const User = mongoose.model('user', userSchema, 'user')

const connectionString = 'mongodb+srv://erk:hgjM69hNKYTzaR4@cluster0.dtvlw.mongodb.net/cargoDatabase?retryWrites=true&w=majority'

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

// users array to imitade db collection
const users = [
  {
    username: "user1",
    password: "123",
  },
];

const Useri = {
  username: "",
  password: "",
};

// Catch username, and password for login and check
ipcMain.on("user:login", (e, arg) => {
  Useri.username = arg.username;
  Useri.password = arg.password;

  console.log(User);

  if (checkUser(users, Useri) && checkPassword(users, Useri)) {
    console.log("Login successful");
  } else if (checkUser(users, Useri) && !checkPassword(users, Useri)) {
    console.log("Wrong password");
  } else {
    console.log("Login failed");
  }
});

// Catch username, and password for signup and check
ipcMain.on("user:signup", (e, arg) => {
  Useri.username = arg.username;
  Useri.password = arg.password;

  console.log(User);
  if (Useri.username !== "" && Useri.password !== "") {
    if (checkUser(users, Useri) && checkPassword(users, Useri)) {
      console.log("Signup failed, already have an account");
    } else if (checkUser(users, Useri) && !checkPassword(users, Useri)) {
      console.log("Forgot Password?");
    } else if(!checkUser(users, Useri)){
      console.log("Signup successful");
    }
  } else {
    console.log("Please Enter username and password to Signup");
  }
});

// Catch username, and password for signup and check
ipcMain.on("user:forgot", (e, arg) => {
  Useri.username = arg.username;
  Useri.password = arg.password;

  console.log(User);
  if (Useri.username !== "" && Useri.password !== "") {
    if (checkUser(users, Useri) && checkPassword(users, Useri)) {
      console.log("New password can't be same old one");
    } else if (checkUser(users, Useri) && !checkPassword(users, Useri)) {
      console.log("Password changed successfully");
    } else if (!checkUser(users, Useri)) {
      console.log("Can't find user");
    }
  } else {
    console.log("Please Enter username and password to Change password");
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoginWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
