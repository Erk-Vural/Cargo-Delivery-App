import { app, BrowserWindow, ipcMain } from "electron";

import { createLoginWindow } from "./login";

// Connect mongoose and create user model
import mongoose = require('mongoose');
import { ConnectOptions } from "mongoose";

const userSchema = new mongoose.Schema({
  username:String,
  password:String
});

const User = mongoose.model('user', userSchema, 'user')

const connectionString = 'mongodb+srv://erk:hgjM69hNKYTzaR4@cluster0.dtvlw.mongodb.net/cargoDB?retryWrites=true&w=majority'

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

// Api to communicate with cloud DB
async function findUser(uss:string, pass:string) {
  const data = {
    username: uss,
    password: pass
  }
  
  return await User.findOne(data, function(err: any, user: any) {
    if (err){
      console.log(err);
    } 
    if(!user){
      console.log("Username or password is invalid");
    }else {
      console.log("Logged in");
    }
  });

}

async function addUser(uss:string, pass:string) {
  const filter = { username: uss, password: pass};
  const newUser = { username: uss, password: pass};
  
  User.findOneAndUpdate(filter, newUser, { upsert:true},
     function(err: any, doc: any) {
    if (err){
      console.log(err);
    } 
    if(doc === null){
      console.log("User doesn't exist, adding new user");
      
    }else{
      console.log("User found try to login");
    } 
  } );
}

async function updateUser(uss:string, pass:string) {
  const filter = { username: uss};
  const update = { password: pass};
  
  User.findOneAndUpdate(filter, update, { upsert:false},
     function(err: any, doc: any) {
    if (err){
      console.log("Can't update the password");
    } 
    if(doc === null){
      console.log("User doesn't exist.");
      
    }else{
      console.log('Succesfully updated the password');
    } 
  } );
}

// Catch username, and password for login and check
ipcMain.on("user:login", (e, arg) => {
  findUser(arg.username, arg.password);
});

// Catch username, and password for signup and check
ipcMain.on("user:signup", (e, arg) => {

  if (arg.username !== "" && arg.password !== "") {
    addUser(arg.username,arg.password);
  }else{
    console.log("Username and password can't be empty");
  }
});

// Catch username, and password for signup and check
ipcMain.on("user:forgot", (e, arg) => {
  updateUser(arg.username,arg.password);
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
