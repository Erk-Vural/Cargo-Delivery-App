import { app, BrowserWindow, ipcMain } from "electron";

import {createLoginWindow, checkLogin} from "./login";


const users = [{
  username: "user1",
  password: "123"
},];

const User = {
  username: "",
  password: ""
}


// Catch username, and password for login and check
ipcMain.on('user:login', (e,arg) => {
  User.username = arg.username;
  User.password = arg.password;

  if(checkLogin(users,User) === true){
    console.log("Login sucsessfull");
  }else {
    console.log("Login failed");
  }

  console.log('this is user main');
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoginWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.