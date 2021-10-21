import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

// Create Cargo Adress window
export function createCargoAddWindow(mainWindow:any): void {
  // Create the browser window.
  const cargoAddWindow = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
    },
    parent:mainWindow,
  });

  // and load the index.html of the app.
  cargoAddWindow.loadFile(path.join(__dirname, "../templates/cargo-add.html"));

  // Open the DevTools.
  cargoAddWindow.webContents.openDevTools();
}