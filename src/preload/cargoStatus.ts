import { ipcRenderer } from "electron";

// Remove old cargoList items
function deleteChild(e:any) {
  //e.firstElementChild can be used.
  let child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
  }


window.addEventListener("DOMContentLoaded", () => {
    const addCargoBtn = document.getElementById('addCargoBtn');
    let isClicked = false;
    
    addCargoBtn.addEventListener('click', () => { 
       isClicked =true;
    
      ipcRenderer.send("click:cargoStatus", isClicked);
    });

    // List cargos 
    const cargoList = document.getElementById("listCargos");

    
    // Get cargos from  add cargo
    ipcRenderer.on('cargo:list', (err,cargos) => {
      deleteChild(cargoList);
  
      cargos.forEach((element:any) => {
        const cargo = element._doc;
        
        const cargoDiv = document.createElement('div');

        const clientName = document.createElement("p")
        clientName.innerText = "Client Name: " + cargo.clientName;
        cargoDiv.appendChild(clientName);

        const locationX = document.createElement("p")
        locationX.innerText = "Location X: " + cargo.locationX;
        cargoDiv.appendChild(locationX);

        const locationY = document.createElement("p")
        locationY.innerText = "Location Y: " + cargo.locationY;
        cargoDiv.appendChild(locationY);

        // Delivered checkbox
        const delivered = document.createElement("INPUT");
        delivered.id =  cargo.clientName;
        delivered.setAttribute("type", "checkbox");
        delivered.setAttribute("value", cargo.delivered);
        cargoDiv.appendChild(delivered);

        // Delete button
        const deleteCargoBtn = document.createElement("button");
        deleteCargoBtn.id  = cargo.clientName;
        deleteCargoBtn.innerText = "Delete";
        cargoDiv.appendChild(deleteCargoBtn);

        cargoList.appendChild(cargoDiv);
      });

    });
});




