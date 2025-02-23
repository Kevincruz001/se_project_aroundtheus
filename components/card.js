export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });

    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__image").alt = this._name;
    this._cardElement.querySelector(".cards__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
