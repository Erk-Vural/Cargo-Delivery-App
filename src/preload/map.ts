import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  // Update Cargo list
  ipcRenderer.send("load:markerlist", true);

});
