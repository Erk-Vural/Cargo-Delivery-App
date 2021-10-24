import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { findCargos } from "../services/cargoService";

// Create Map window
let mapWindow: BrowserWindow;
let cargoStatusWindow: BrowserWindow;

export function createMapWindow(cargoStatusWdw: BrowserWindow): any {
  // Create the browser window.
  mapWindow = new BrowserWindow({
    height: 1000,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/map.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mapWindow.loadFile(path.join(__dirname, "../../templates/map.html"));

  // Open the DevTools.
  mapWindow.webContents.openDevTools();

  cargoStatusWindow = cargoStatusWdw;
}

export function markerList(): void {
  ipcMain.on("load:markerlist", (e, arg) => {
    findCargos((err: any, cargos: any) => {
      if (!err) {
        mapWindow.webContents.send("marker:list", cargos);
      } else {
        console.log(err);
      }
    });
  });
}

export function updateMarkers(): void {
  findCargos((err: any, cargos: any) => {
    if (!err) {
      mapWindow.webContents.send("marker:list", cargos);
    } else {
      console.log(err);
    }
  });
}

ipcMain.on("click:addMarker", (e, arg) => {
  cargoStatusWindow.webContents.send("map:addMarker", arg);
});
