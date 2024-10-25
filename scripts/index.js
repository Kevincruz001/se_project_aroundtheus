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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-edit-button-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditInput = document.querySelector(".profile__edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardModalCloseButton = document.querySelector("#card-button-close");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const imageModal = document.querySelector("#image-modal");
const imageModalCloseButton = document.querySelector(
  "#image-modal-close-button"
);
const imageModalContainer = document.querySelector(".modal__image_container");
const cardModalForm = document.forms["card-form"];
const modalImageEl = document.querySelector(".modal__image");
const modalTitleEl = document.querySelector(".modal__image-title");

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

function setImageModalContent(imageSrc, imageAlt, titleText) {
  modalImageEl.src = imageSrc;
  modalImageEl.alt = imageAlt;
  modalTitleEl.textContent = titleText;
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

function createCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    setImageModalContent(
      cardImageEl.src,
      cardImageEl.alt,
      cardTitleEl.textContent
    );
    toggleModal(imageModal);
  });

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("cards__like-button_active")
  );
  deleteButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
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
  });

  handleFormSubmission(addCardModal, () => {
    const newCard = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };
    cardListEl.prepend(createCardElement(newCard));
    cardModalForm.reset();
  });

  initialCards.forEach((cardData) => {
    cardListEl.prepend(createCardElement(cardData));
  });
});
