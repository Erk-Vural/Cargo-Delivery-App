import { ipcRenderer } from "electron";

const Cargo = {
  clientName: "",
  locationX: "",
  locationY: "",
  delivered: false,
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

    Cargo.delivered = false;

    ipcRenderer.send("cargo:add", Cargo);
  }

  ipcRenderer.on("cargoStatusMain:addMarker", (e, arg) => {
    console.log(arg);

    (<HTMLInputElement>document.getElementById("cargoadd-locX")).value =
      arg.lat;
    (<HTMLInputElement>document.getElementById("cargoadd-locY")).value =
      arg.lng;
  });
});
