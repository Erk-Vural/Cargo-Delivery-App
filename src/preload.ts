// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

function submitForm(e: { preventDefault: () => void; }) {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    
    ipcRenderer.send('username:login', username);
    ipcRenderer.send('password:login', password);
}
});
