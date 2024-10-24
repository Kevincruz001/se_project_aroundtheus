function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.add(inputErrorClass); // Adds red border
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass); // Makes error message visible
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector("#" + inputEl.id + "-error");
  inputEl.classList.remove(inputErrorClass); // Removes red border
  errorMessageEl.textContent = ""; // Clears the error message
  errorMessageEl.classList.remove(errorClass); // Hides the error message
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}
function toggleButtonState(inputEls, buttonEl, inactiveButtonClass) {
  const hasInvalidInput = inputEls.some(
    (inputEl) => !inputEl.validity.valid || inputEl.value.trim() === ""
  );
  if (hasInvalidInput) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButtonEl = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputEls, submitButtonEl, inactiveButtonClass);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButtonEl, inactiveButtonClass);
    });
  });
}

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop through each input to see if all are valid
    //if input is not valid
    //grab the validation message
    //add the error class to the input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
