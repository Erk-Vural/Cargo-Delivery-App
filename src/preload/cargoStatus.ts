import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
    const addCargoBtn = document.getElementById('addCargoBtn');
    let isClicked = false;
    
    addCargoBtn.addEventListener('click', () => { 
       isClicked =true;
    
      ipcRenderer.send("click:cargoStatus", isClicked);
    });

    // List cargos 
    const list = document.getElementById("listCargos");

    ipcRenderer.on('cargo:list', (err,cargos) => {
  
      cargos.forEach((element:any) => {
        const cargo = element._doc;
                      
        const listItem = document.createElement('li');

        const clientNameText = document.createTextNode("Client Name: " + cargo.clientName);
        const locationXText = document.createTextNode(" Location X: " + cargo.locationX);
        const locationYText = document.createTextNode(" Location Y: " + cargo.locationY); 
        
        listItem.appendChild(clientNameText);
        listItem.appendChild(locationXText);
        listItem.appendChild(locationYText);

        list.appendChild(listItem);
      });

    });
});




