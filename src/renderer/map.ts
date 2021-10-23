// Load map
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 47.5300099, lng: -122.209046 },
    zoom: 8,
  });
}