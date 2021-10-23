import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  // Update Cargo list
  ipcRenderer.send("load:markerlist", true);

  // add markers to mapWindow
  ipcRenderer.on("marker:list", (err, cargos) => {
    cargos.forEach((element: any) => {
      const cargo = element._doc;

      const latLang = {
        lat: cargo.locationX,
        lng: cargo.locationY,
      };

      new google.maps.Marker({
        position: latLang,
        map,
        title: cargo.clientName,
      });
    });
  });
});
