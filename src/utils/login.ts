import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

import { findUser,addUser, updateUser } from "../services/userService";
import { createCargoStatusWindow } from "./cargoStatus";
import { createMapWindow } from "./map";

// Create Login window
export function createLoginWindow(): void {
  // Create the browser window.
  const loginWindow = new BrowserWindow({
    height: 600,
    width: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  createCargoStatusWindow(loginWindow);
  createMapWindow(loginWindow);

  // and load the index.html of the app.
  loginWindow.loadFile(path.join(__dirname, "../templates/login.html"));

  // Open the DevTools.
  loginWindow.webContents.openDevTools();
}

// Get data from renderer to main
export function login():void {
  // Catch username, and password for login and check
ipcMain.on("user:login", (e, arg) => {
  findUser(arg.username, arg.password);
});
}

export function signup():void {
  ipcMain.on("user:signup", (e, arg) => {

    if (arg.username !== "" && arg.password !== "") {
      addUser(arg.username,arg.password);
    }else{
      console.log("Username and password can't be empty");
    }
  });
}

export function forgotPass():void {
  ipcMain.on("user:forgot", (e, arg) => {
    updateUser(arg.username,arg.password);
  });
}

function cargoStatusWindow() {
  throw new Error("Function not implemented.");
}

