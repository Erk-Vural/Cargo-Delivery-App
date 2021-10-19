// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer } from "electron";

const User = {
  username: "",
  password: ""
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('form');
form.addEventListener('submit', submitForm);

function submitForm(e: { preventDefault: () => void; }) {
    User.username = (<HTMLInputElement>document.getElementById('username')).value;
    User.password = (<HTMLInputElement>document.getElementById('password')).value;
    
    ipcRenderer.send('user:login', User);
}
});
