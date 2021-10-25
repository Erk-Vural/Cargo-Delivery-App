import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { createCargo, updateCourrier } from "../services/cargoService";
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
    if (arg.clientName !== "" || arg.lat !== "" || arg.lng !== "") {
      createCargo(
        arg.clientName,
        arg.lat,
        arg.lng,
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

export function changeCourrier(): void {
  ipcMain.on("courrier:change", (e, arg) => {
    if (arg.lat !== "" || arg.lng !== "") {
      updateCourrier(arg.lat, arg.lng, (err: any, cargos: any) => {
        if (!err) {
          console.log("Courrier update is successful");
        } else {
          console.log(err);
        }
      });
    } else {
      console.log("Courrier info can't be empty");
    }
  });
}
