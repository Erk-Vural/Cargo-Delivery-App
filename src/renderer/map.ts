import { Loader } from "@googlemaps/js-api-loader";
import { ipcRenderer } from "electron";

let map: google.maps.Map;

const additionalOptions = {};

// Load map
const loader = new Loader({
  apiKey: "AIzaSyDv9iNeDL_kmNc5OU-syA4Ijhxq5QoS6TY",
  version: "weekly",
  ...additionalOptions,
});

loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 47.5300099, lng: -122.209046 },
    zoom: 8,
  });

  // add markers to mapWindow
  ipcRenderer.on("marker:list", (err, cargos) => {

    cargos.forEach((element: any) => {
      const cargo = element._doc;

      const latLang = {
        lat: Number(cargo.locationX),
        lng: Number(cargo.locationY),
      };

      new google.maps.Marker({
        position: latLang,
        map,
        title: cargo.clientName,
      });
    });
  });
});
