import "./index.css";

import { Api } from "./api";
import { Popup } from "./popup";
import { CardList } from "./cardList";

const GROUP_ID = "cohort3";
const TOKEN = "361584ad-ce3b-45ac-9ca2-820a2f350a53";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://praktikum.tk/" + GROUP_ID
    : "https://praktikum.tk/" + GROUP_ID;

const root = document.querySelector(".root");
const popup = root.querySelector(".popup");
const popup_info = root.querySelector(".popup_info");
const popup_image = root.querySelector(".popup_image");
const addButton = root.querySelector(".user-info__button");
const newPlaceNameInput = root.querySelector(".popup .popup__input_type_name");
const newPlaceLinkInput = root.querySelector(
  ".popup .popup__input_type_link-url"
);
const saveButtonPlace = root.querySelector(".popup__button");
const form = root.querySelector(".popup__form");
const resetButtonImage = root.querySelector(".popup_image .popup__close");
const contentImage = root.querySelector(".popup__image");
const placesList = root.querySelector(".places-list.root__section");
const addInfo = root.querySelector(".user-info__button-edit");
const nameInput = root.querySelector(".popup_info .popup__input_type_name");
const jobInput = root.querySelector(".popup_info .popup__input_type_job");
const saveButton = root.querySelector(".popup_info .popup__button_info");
const formProfile = root.querySelector(".popup_info .popup__form");

const api = new Api(TOKEN, serverUrl);

let cardList;
const profileFormPopup = new Popup(popup_info);
const cardFormPopup = new Popup(popup);
const previewPopup = new Popup(popup_image);

function updateButton(el, enabled) {
  if (enabled) {
    el.removeAttribute("disabled");
  } else {
    el.setAttribute("disabled", "disabled");
  }
}

function updateErrorMsg(shownClass, el, shown) {
  if (shown) {
    el.classList.add(shownClass);
  } else {
    el.classList.remove(shownClass);
  }
}

function newPlace() {
  cardFormPopup.open();
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
  validatePlace();
}

function addPlace(ev) {
  ev.preventDefault();
  const name = ev.target.name.value;
  const link = ev.target.link.value;
  const model = { name, link };
  cardList.addCard(model);
  cardFormPopup.close();
}

function validatePlace() {
  updateButton(
    saveButtonPlace,
    newPlaceNameInput.value !== "" && newPlaceLinkInput.value !== ""
  );
}

function openImage(imageSrc) {
  previewPopup.open();
  const img = document.createElement("IMG");
  img.src = imageSrc;
  contentImage.innerHTML = "";
  contentImage.appendChild(img);
}

function closeImage() {
  previewPopup.close();
}

function openProfile() {
  profileFormPopup.open();
}

function checkProfile() {
  const CLASS_ERR = "popup__error_is-opened";

  const errorProfileNameEmpty = root.querySelector(".popup__error_name-empty");
  const errorProfileNameLength = root.querySelector(
    ".popup__error_name-length"
  );
  const errorProfileJobEmpty = root.querySelector(".popup__error_job-empty");
  const errorProfileJobLength = root.querySelector(".popup__error_job-length");

  let error = false;

  if (nameInput.value.length < 1) {
    updateErrorMsg(CLASS_ERR, errorProfileNameEmpty, true);
    error = true;
  } else {
    updateErrorMsg(CLASS_ERR, errorProfileNameEmpty, false);
  }

  if (nameInput.value.length === 1 || nameInput.value.length >= 30) {
    updateErrorMsg(CLASS_ERR, errorProfileNameLength, true);
    error = true;
  } else {
    updateErrorMsg(CLASS_ERR, errorProfileNameLength, false);
  }

  if (jobInput.value.length < 1) {
    updateErrorMsg(CLASS_ERR, errorProfileJobEmpty, true);
    error = true;
  } else {
    updateErrorMsg(CLASS_ERR, errorProfileJobEmpty, false);
  }

  if (jobInput.value.length === 1 || jobInput.value.length >= 30) {
    updateErrorMsg(CLASS_ERR, errorProfileJobLength, true);
    error = true;
  } else {
    updateErrorMsg(CLASS_ERR, errorProfileJobLength, false);
  }

  updateButton(saveButton, !error);
}

function saveProfile(ev) {
  ev.preventDefault();
  const name = ev.target.nameProfile.value;
  const job = ev.target.job.value;

  api.saveUser(name, job).then(data => {
    profileFormPopup.close();
    renderProfile(data.name, data.about);
  });
}

function renderProfile(name, about, avatar) {
  root.querySelector(".user-info__name").textContent = name;
  root.querySelector(".user-info__job").textContent = about;
  if (avatar) {
    root.querySelector(
      ".user-info__photo"
    ).style.backgroundImage = `url(${avatar})`;
  }
}

api.getUser().then(data => {
  renderProfile(data.name, data.about, data.avatar);
});

api.getCards().then(data => {
  cardList = new CardList(placesList, data, openImage);
  cardList.render();
});

addButton.addEventListener("click", newPlace);
newPlaceNameInput.addEventListener("input", validatePlace);
newPlaceLinkInput.addEventListener("input", validatePlace);
form.addEventListener("submit", addPlace);
resetButtonImage.addEventListener("click", closeImage);
addInfo.addEventListener("click", openProfile);
nameInput.addEventListener("input", checkProfile);
jobInput.addEventListener("input", checkProfile);
formProfile.addEventListener("submit", saveProfile);
