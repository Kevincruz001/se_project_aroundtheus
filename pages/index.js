import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-edit-button-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-form"];

// Card elements
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardModalCloseButton = document.querySelector("#card-button-close");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const cardModalForm = document.forms["card-form"];

// Image modal elements
const imageModal = document.querySelector("#image-modal");
const imageModalCloseButton = document.querySelector(
  "#image-modal-close-button"
);
const modalImageEl = document.querySelector(".modal__image");
const modalTitleEl = document.querySelector(".modal__image-title");

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(name, link) {
  modalImageEl.src = link;
  modalImageEl.alt = name;
  modalTitleEl.textContent = name;
  toggleModal(imageModal);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});

function toggleModal(modal) {
  modal.classList.toggle("modal_opened");
  if (modal.classList.contains("modal_opened")) {
    document.addEventListener("keydown", handleEscClose);
  } else {
    document.removeEventListener("keydown", handleEscClose);
  }
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      toggleModal(openModal);
    }
  }
}

function setupModalToggle(openButton, closeButton, modal) {
  if (openButton) {
    openButton.addEventListener("click", () => toggleModal(modal));
  }
  if (closeButton) {
    closeButton.addEventListener("click", () => toggleModal(modal));
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(modal);
    }
  });
}

function handleFormSubmission(form, callback) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    callback();

    toggleModal(form.closest(".modal"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupModalToggle(profileEditButton, profileCloseButton, profileEditModal);
  setupModalToggle(addNewCardButton, cardModalCloseButton, addCardModal);

  setupModalToggle(null, imageModalCloseButton, imageModal);

  profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  });

  handleFormSubmission(profileEditForm, () => {
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    formValidators["profile-form"].resetValidation();
  });

  handleFormSubmission(cardModalForm, () => {
    const newCardData = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };

    const newCardElement = createCard(newCardData);
    cardListEl.prepend(newCardElement);
    cardModalForm.reset();
    formValidators["card-form"].resetValidation();
  });

  const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

  enableValidation(validationConfig);
});
