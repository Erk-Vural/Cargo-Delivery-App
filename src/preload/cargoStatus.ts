import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
    const addCargoBtn = document.getElementById('addCargoBtn');
    let isClicked = false;
    
    addCargoBtn.addEventListener('click', () => { 
      console.log("addCargoBtn Clicked");
       isClicked =true;
    
      ipcRenderer.send("click:cargoStatus", isClicked);
    });
});




