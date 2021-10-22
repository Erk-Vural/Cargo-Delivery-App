import { BrowserWindow, ipcMain, } from "electron";
import * as path from "path";
import { createCargoAddWindow } from "./cargoAdd";

// Create Cargo Status window
export function createCargoStatusWindow(): void {
  // Create the browser window.
  const cargoStatusWindow = new BrowserWindow({
    height: 1000,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/cargoStatus.js"),
    },
 
  });

  // and load the index.html of the app.
  cargoStatusWindow.loadFile(path.join(__dirname, "../../templates/cargo-status.html"));

  // Open the DevTools.
  cargoStatusWindow.webContents.openDevTools();
}

// addCargo button clicked event handler
ipcMain.on("click:cargoStatus", (e, arg) => {
  if(arg){
    createCargoAddWindow();
  }
});