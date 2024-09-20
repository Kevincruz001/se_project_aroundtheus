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
const profileEditForm = profileEditModal.querySelector(".modal__form");
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

function profileClosePopup() {
  profileEditModal.classList.remove("modal_opened");
  profileEditModal.classList.toggle("modal_closing");
}

function cardClosePopup() {
  addCardModal.classList.remove("modal_opened");
  addCardModal.classList.toggle("modal_closing");
}

function imageClosePopup() {
  imageModal.classList.remove("modal_opened");
  imageModal.classList.toggle("modal_closing");
  setTimeout(() => {
    imageModal.classList.remove("modal_closing");
  }, 500);
}

function addLikeButtonListener(likeButton) {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");
  const modalImageEl = document.querySelector(".modal__image");
  const modalTitleEl = document.querySelector(".modal__image-title");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    imageModal.classList.add("modal_opened");
    modalImageEl.src = cardImageEl.src;
    modalImageEl.alt = cardImageEl.alt;
    modalTitleEl.textContent = cardTitleEl.textContent;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  addLikeButtonListener(likeButton);

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileClosePopup();
}

function handleCardSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  const newCardElement = getCardElement(newCard);

  cardListEl.prepend(newCardElement);

  cardClosePopup();
  e.target.reset();
}

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileEditModal.classList.add("modal_opened");
  profileEditModal.classList.remove("modal_closing");
});

profileCloseButton.addEventListener("click", profileClosePopup);
cardModalCloseButton.addEventListener("click", cardClosePopup);
imageModalCloseButton.addEventListener("click", imageClosePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  addCardModal.classList.add("modal_opened");
  addCardModal.classList.remove("modal_closing");
});

initialCards.forEach((cardData) => {
  cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

const likeButtons = document.querySelectorAll(".cards__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });
});

addCardModal.addEventListener("submit", handleCardSubmit);
likeButtons.forEach(addLikeButtonListener);
