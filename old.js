const root = document.querySelector('.root'); 
const placeList = root.querySelector('.places-list'); 
const userInfoButton = root.querySelector('.user-info__button');
const popup = root.querySelector('.popup');
const popupClose = root.querySelector('.popup__close');
const placeCardLikeIcon = document.querySelector('.place-card__like-icon');
const placeCardDeleteIcon = document.querySelector('.place-card__delete-icon'); 
const userEditButton = root.querySelector('.user-edit__button'); 
const popupUserInfo = root.querySelector('.popup-user_info'); 
const popupUserInfoClose = root.querySelector('.popup-user_info__close'); 
const popupImage = root.querySelector('.popup-image'); 
const popupImageImg = root.querySelector('.popup-image__img'); 
const popupImageClose = root.querySelector('.popup-image__close');
const popupButton = root.querySelector('.popup__button');
const popupUserInfoButton = root.querySelector('.popup-user_info__button');
const popupForm = document.forms.new;   
const formInfo = document.forms.info; 
const inputName = popupForm.elements.name; 
const inputLink = popupForm.elements.link;
const submit = document.querySelector('#submit'); 
const name = document.querySelector('#name'); 
const job = document.querySelector('#job'); 


function createCard(initialName, initialLink) {
    const placeCard = document.createElement('div'); 
    placeCard.classList.add('place-card'); 
    placeCard.innerHTML = `
    <div class="place-card__image" style="background-image: url(${initialLink})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${initialName}</h3>
      <button class="place-card__like-icon"></button>
    </div>`
    placeList.appendChild(placeCard); 
    return placeCard; 
}

function addCard(array) {
    array.forEach(function(item){

        createCard(item.name, item.link);
    });
}

function openClosePopup() { 
    popup.classList.toggle('popup_is-opened');

    setEventListeners(document.querySelector('.popup'));
}

function openCloseUserPopup() { 
  popupUserInfo.classList.toggle('popup_is-opened');

  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');

  formInfo.sign.value = userInfoName.textContent; 
  formInfo.about.value = userInfoJob.textContent;

  setEventListeners(popupUserInfo);
};

function likeOrRemove(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked'); 
    } 
    if (event.target.classList.contains('place-card__delete-icon')) {
        event.currentTarget.removeChild(event.target.closest('.place-card')); 
    }
    openImagePopup(event); 
}

function addNewCards(event) {

    event.preventDefault(); 
    createCard(inputName.value, inputLink.value); 
    openClosePopup(); 
}

function addUserInfo(event) {

    event.preventDefault();
    const userInfoName = document.querySelector('.user-info__name');
    const userInfoJob = document.querySelector('.user-info__job');
    
    userInfoName.textContent = formInfo.sign.value; 
    userInfoJob.textContent = formInfo.about.value;

    openCloseUserPopup();
}


function openImagePopup(event) {

  if (event.target.classList.contains('place-card__image')) {

    popupImage.classList.toggle('popup-image_is-opened'); 
    popupImageImg.src = event.target.style.backgroundImage.slice(5, -2);

  } else if (event.target.classList.contains('popup-image__close')) {
    popupImage.classList.toggle('popup-image_is-opened');
  }
}

const ERROR_MESSAGES = {

  tooShort: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле', 
  typeMismatch: 'Здесь должна быть ссылка'
}

function checkInputValidity(input, error) {
  error.textContent = '';

  if(input.validity.tooShort) {
    error.textContent = ERROR_MESSAGES.tooShort;
  }

  if(input.validity.valueMissing) {
    error.textContent = ERROR_MESSAGES.valueMissing;
  }

  if(input.validity.typeMismatch) {
    error.textContent = ERROR_MESSAGES.typeMismatch;
  }

}

function setSubmitButtonState(button, form) {

  if(form.checkValidity()) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', true);
  }
}

function setEventListeners(popup) {

    const form = popup.querySelector('#form'); 
    const button = form.querySelector('#submit'); 

    form.addEventListener('input', event => {
      checkInputValidity(event.target, event.target.nextElementSibling);
      setSubmitButtonState(button, form);
    });
}

function resetError(errors) {
    errors.forEach(error => {
      error.textContent = ''
    });
}

window.addEventListener('load', () => {
  addCard(initialCards);
});

placeList.addEventListener('click', likeOrRemove); 

userInfoButton.addEventListener('click', event => {
  openClosePopup(event); 
}); 

popupClose.addEventListener('click', event => {
  openClosePopup(event);
  resetError(document.querySelectorAll('.popup__error'));
  popupForm.reset();
}); 

userEditButton.addEventListener('click', event => {
  openCloseUserPopup(event);
}); 

popupForm.addEventListener('submit', event => {
  addNewCards(event);
  document.querySelector('.popup-new__button').setAttribute('disabled', true);
  popupForm.reset(); 
}); 

popupUserInfoClose.addEventListener('click', event => {
  openCloseUserPopup(event);
  popupUserInfoButton.removeAttribute('disabled', true);
  resetError(document.querySelectorAll('.popup__error'));
});

formInfo.addEventListener('submit', addUserInfo); 

popupImageClose.addEventListener('click', likeOrRemove);