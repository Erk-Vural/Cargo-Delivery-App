import { ipcRenderer } from "electron";

const Cargo = {
  clientName: "",
  lat: "",
  lng: "",
  delivered: false,
};

const Courrier = {
  lat: "",
  lng: "",
};

window.addEventListener("DOMContentLoaded", () => {
  // get data from Login form to send  data main
  const cargoAddForm = document.getElementById("cargoadd-form");
  cargoAddForm.addEventListener("submit", submitCargoAddForm);

  function submitCargoAddForm(e: { preventDefault: () => void }) {
    Cargo.clientName = (<HTMLInputElement>(
      document.getElementById("cargoadd-name")
    )).value;
    Cargo.lat = (<HTMLInputElement>(
      document.getElementById("cargoadd-lat")
    )).value;
    Cargo.lng = (<HTMLInputElement>(
      document.getElementById("cargoadd-lng")
    )).value;

    Cargo.delivered = false;

    ipcRenderer.send("cargo:add", Cargo);
  }

  // get data from Courrier form to send  data main
  const courrierForm = document.getElementById("courrier-form");
  courrierForm.addEventListener("submit", submitCourrierForm);

  function submitCourrierForm(e: { preventDefault: () => void }) {
    Courrier.lat = (<HTMLInputElement>(
      document.getElementById("courrier-lat")
    )).value;
    Courrier.lng = (<HTMLInputElement>(
      document.getElementById("courrier-lng")
    )).value;

    ipcRenderer.send("courrier:change", Courrier);
  }

  ipcRenderer.on("cargoStatusMain:addMarker", (e, arg) => {
    // Add map click value to cargo input
    (<HTMLInputElement>document.getElementById("cargoadd-lat")).value = arg.lat;
    (<HTMLInputElement>document.getElementById("cargoadd-lng")).value = arg.lng;

    // Add map click value to courrier input
    (<HTMLInputElement>document.getElementById("courrier-lat")).value = arg.lat;
    (<HTMLInputElement>document.getElementById("courrier-lng")).value = arg.lng;
  });
});
