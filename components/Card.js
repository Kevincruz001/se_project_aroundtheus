export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteIcon();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._trashButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
