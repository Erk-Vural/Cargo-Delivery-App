import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { createCargo } from "../services/cargoService";


// Create Cargo Adress window
export function createCargoAddWindow(): void {
  // Create the browser window.
  const cargoAddWindow = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/cargoAdd.js"),
    },
  });

  // and load the index.html of the app.
  cargoAddWindow.loadFile(path.join(__dirname, "../../templates/cargo-add.html"));

  // Open the DevTools.
  cargoAddWindow.webContents.openDevTools();

}

// Get data from renderer to main
export function cargoAdd():void {
 
  ipcMain.on("cargo:add", (e, arg) => {

    createCargo(arg.clientName, arg.locationX,arg.locationY, (err:any) => {
      if(!err) {
        console.log("Cargo added");

      }else{
        console.log(err);
  
      }
    });
  });
}