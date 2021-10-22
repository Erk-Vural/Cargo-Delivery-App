import { ipcRenderer } from "electron";

const Cargo = {
  clientName: "",
  locationX: "",
  locationY: "",
};

window.addEventListener("DOMContentLoaded", () => {

  // get data from Login Formss to Main 
  const cargoAddForm = document.getElementById("cargoadd-form");
  cargoAddForm.addEventListener("submit", submitCargoAddForm);

  function submitCargoAddForm(e: { preventDefault: () => void }) {
  
    Cargo.clientName = (<HTMLInputElement>(
      document.getElementById("cargoadd-name")
    )).value;
    Cargo.locationX = (<HTMLInputElement>(
      document.getElementById("cargoadd-locX")
    )).value;
    Cargo.locationY = (<HTMLInputElement>(
      document.getElementById("cargoadd-locY")
    )).value;

    ipcRenderer.send("cargo:add", Cargo);
  }
});

