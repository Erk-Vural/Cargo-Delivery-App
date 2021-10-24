import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { createCargo } from "../services/cargoService";
import { updateCargoList } from "./cargoStatus";
import { updateMarkers } from "./map";

// Create Cargo Adress window
let cargoAddWindow: BrowserWindow;
let cargoStatusWindow: BrowserWindow;

export function createCargoAddWindow(parentWindow: BrowserWindow): any {
  // Create the browser window.
  cargoAddWindow = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/cargoAdd.js"),
    },
    parent: parentWindow,
  });

  cargoStatusWindow = parentWindow;

  // and load the index.html of the app.
  cargoAddWindow.loadFile(
    path.join(__dirname, "../../templates/cargo-add.html")
  );

  // Open the DevTools.
  cargoAddWindow.webContents.openDevTools();

  return cargoAddWindow;
}

// Get data from renderer to main

export function cargoAdd(): void {
  ipcMain.on("cargo:add", (e, arg) => {
    if (arg.clientName !== "" || arg.locationX !== "" || arg.locationY !== "") {
      createCargo(
        arg.clientName,
        arg.locationX,
        arg.locationY,
        arg.delivered,
        (err: any, cargo: any) => {
          if (!err) {

            updateCargoList();
            updateMarkers();

            cargoAddWindow.close();
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log("Cargo info can't be empty");
    }
  });
}
