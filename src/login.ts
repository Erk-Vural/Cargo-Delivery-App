import { BrowserWindow } from "electron";
import * as path from "path";

export function createLoginWindow() : void {
    // Create the browser window.
      const loginWindow = new BrowserWindow({
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      width: 800,
    });
  
    // and load the index.html of the app.
    loginWindow.loadFile(path.join(__dirname, "../templates/login.html"));
  
    // Open the DevTools.
    loginWindow.webContents.openDevTools();
}

export function checkLogin(users:any,
  newUser:{ username: string; password: string; }):boolean {
  
  let token = false;

  users.forEach((user: { username: string; password: string; }) => {

   if(user.username === newUser.username 
      && user.password === newUser.password) {
        
      token = true;
    }
  });
  
  return token;
}
