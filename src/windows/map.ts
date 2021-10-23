import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

// Create Map window
export function createMapWindow(): void {
  // Create the browser window.
  const mapWindow = new BrowserWindow({
    height: 1000,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/map.js"),
    },
  });

  // and load the index.html of the app.
  mapWindow.loadFile(path.join(__dirname, "../../templates/map.html"));

  // Open the DevTools.
  mapWindow.webContents.openDevTools();
}
