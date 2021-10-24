import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

import { findUser, addUser, updateUser } from "../services/userService";
import { createCargoStatusWindow } from "./cargoStatus";
import { createMapWindow } from "./map";


// Window clones for communication
let cargoStatusWindow:BrowserWindow;
let mapWindow:BrowserWindow;

// Create Login window
export function createLoginWindow(): any {
  // Create the browser window.
  const loginWindow = new BrowserWindow({
    height: 600,
    width: 400,
    webPreferences: {
      preload: path.join(__dirname, "../preload/login.js"),
    },
  });

  // and load the index.html of the app.
  loginWindow.loadFile(path.join(__dirname, "../../templates/login.html"));

  // Open the DevTools.
  loginWindow.webContents.openDevTools();

  return loginWindow;
}

// Get data from renderer to main
export function login(loginWindow: BrowserWindow): void {
  ipcMain.on("user:login", (e, arg) => {
    findUser(arg.username, arg.password, (err: any, result: any) => {
      if (!err) {
        if (result) {
          console.log("Logged in");


          cargoStatusWindow = createCargoStatusWindow();

          createMapWindow(cargoStatusWindow);

          loginWindow.close();
        } else {
          console.log("Username or password is invalid");
        }
      } else {
        console.log(err);
      }
    });
  });
}

export function signup(): void {
  ipcMain.on("user:signup", (e, arg) => {
    if (arg.username !== "" && arg.password !== "") {
      addUser(arg.username, arg.password, (err: any, result: any) => {
        if (!err) {
          if (result) {
            console.log("User already exist try to login");
          } else {
            console.log("Signed in");
          }
        } else {
          console.log(err);
        }
      });
    } else {
      console.log("Username and password can't be empty");
    }
  });
}

export function forgotPass(): void {
  ipcMain.on("user:forgot", (e, arg) => {
    updateUser(arg.username, arg.password, (err: any, result: any) => {
      if (!err) {
        if (result) {
          console.log("Password changed succesfully");
        } else {
          console.log("Username is invalid");
        }
      } else {
        console.log(err);
      }
    });
  });
}
