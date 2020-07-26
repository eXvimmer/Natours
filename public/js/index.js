import "@babel/polyfill";
import { login, logout } from "./login";
import { displayMap } from "./mapbox";
import { updateSettings } from "./updateSettings";
import { bookTour } from "./stripe";

const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logOutButton = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(
  ".form-user-password"
);

const bookBtn = document.getElementById("book-tour");

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);

  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutButton) {
  logOutButton.addEventListener("click", logout);
}

if (userDataForm) {
  userDataForm.addEventListener("submit", e => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);

    updateSettings(form, "data");
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async e => {
    e.preventDefault();
    const button = document.querySelector(".btn--save-password");
    button.textContent = "Updating...";
    const passwordCurrent = document.getElementById(
      "password-current"
    ).value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById(
      "password-confirm"
    ).value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
    button.textContent = "Save Password";
  });
}

if (bookBtn) {
  bookBtn.addEventListener("click", async e => {
    const text = e.target.textContent;
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    await bookTour(tourId);
    e.target.textContent = text;
  });
}
