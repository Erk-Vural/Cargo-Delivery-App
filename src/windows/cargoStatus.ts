import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { deleteCargo, findCargos, updateCargo } from "../services/cargoService";
import { createCargoAddWindow } from "./cargoAdd";

// Create Cargo Status window
let cargoStatusWindow: BrowserWindow;

export function createCargoStatusWindow(): void {
  // Create the browser window.
  cargoStatusWindow = new BrowserWindow({
    height: 1000,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/cargoStatus.js"),
    },
  });

  // and load the index.html of the app.
  cargoStatusWindow.loadFile(
    path.join(__dirname, "../../templates/cargo-status.html")
  );

  // Open the DevTools.
  cargoStatusWindow.webContents.openDevTools();
}

// addCargo button clicked event handler
ipcMain.on("click:openAddCargo", (e, arg) => {
  if (arg) {
    createCargoAddWindow(cargoStatusWindow);
  }
});

export function deliveredHandler() {
  ipcMain.on("click:delivered", (e, arg) => {
    console.log(arg);

    updateCargo(arg.clientname, arg.delivered, (err: any, result: any) => {
      if (!err) {
        if (result) {
          console.log("Cargo updated succesfully");
          updateCargoList();
        } else {
          console.log("Cargo update failed");
        }
      } else {
        console.log(err);
      }
    });
  });
}

export function deleteHandler() {
  ipcMain.on("click:deleteCargo", (e, arg) => {
    deleteCargo(arg.clientname, (err: any, result: any) => {
      if (!err) {
        if (result) {
          console.log("Cargo deleted succesfully");
          updateCargoList();
        } else {
          console.log("Cargo deleted failed");
        }
      } else {
        console.log(err);
      }
    });
  });
}

export function cargoList(): void {
  ipcMain.on("load:cargolist", (e, arg) => {
    findCargos((err: any, cargos: any) => {
      if (!err) {

        cargoStatusWindow.webContents.send("cargo:list", cargos);
      } else {
        console.log(err);
      }
    });
  });
}

export function updateCargoList(): void {
  findCargos((err: any, cargos: any) => {
    if (!err) {

      cargoStatusWindow.webContents.send("cargo:list", cargos);
    } else {
      console.log(err);
    }
  });
}
