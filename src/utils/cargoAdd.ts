import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { createCargo, findCargos } from "../services/cargoService";


// Create Cargo Adress window
let cargoAddWindow:BrowserWindow;

export function createCargoAddWindow(): void {
  // Create the browser window.
  cargoAddWindow = new BrowserWindow({
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

    createCargo(arg.clientName, arg.locationX,arg.locationY,arg.delivered, (err:any, result:any) => {
      if(!err) {
        console.log(result);
        cargoAddWindow.close();

      }else{
        console.log(err);
  
      }
    });
  });
}

export function cargoList():void {
  ipcMain.on("cargo:add", (e, arg) => {
    findCargos((err:any, cargos:any)=> {
      if(!err) {
        console.log(cargos);

      }else{
        console.log(err);
  
      }
    });
  });
}


