(()=> {
//корень
const root = document.querySelector('.root'); 
const rootContainer = new Root(root);

//переменные
const placeList = rootContainer.container.querySelector('.places-list');
const popup = rootContainer.container.querySelector('.popup');
const userInfoButton = rootContainer.container.querySelector('.user-info__button');
const popupClose = rootContainer.container.querySelector('.popup__close');
const userInfo = rootContainer.container.querySelector('.user-info');
const popupUserInfo = rootContainer.container.querySelector('.popup-user_info');
const userEditButton = rootContainer.container.querySelector('.user-edit__button'); 
const popupUserInfoClose = rootContainer.container.querySelector('.popup-user_info__close');
const popupImage = rootContainer.container.querySelector('.popup-image'); 
const popupImageImg = rootContainer.container.querySelector('.popup-image__img');
const popupImageClose = rootContainer.container.querySelector('.popup-image__close');
const formInfo = document.forms.info;
const popupForm = document.forms.new; 
const { name, link } = popupForm.elements;

//объект с ошибками валидации
const ERROR_MESSAGES = {

    tooShort: 'Должно быть от 2 до 30 символов',
    valueMissing: 'Это обязательное поле', 
    typeMismatch: 'Здесь должна быть ссылка'
}

//вызов функций
const card = new Card();
const cardList = new CardList(placeList, initialCards, card)
const popupPlace = new Popup(popup);
const popupUser = new PopupUser(popupUserInfo, popupUserInfo);
const popupPicture = new PopupImage(popupImage, popupImageImg);
const profile = new Profile(userInfo);
const userInform = new UserInfo(popupUserInfo, profile);
const error =  new Error(ERROR_MESSAGES);
const formValidationPlace = new FormValidator(popupForm, error.errors);
const formValidationInfo = new FormValidator(formInfo, error.errors)

//слушатели событий
placeList.addEventListener('click', () => {
    card.like(event);
    card.remove(event);
    popupPicture.open();
});
userInfoButton.addEventListener('click', () => {
    popupPlace.open();
    formValidationPlace.setEventListeners();
});
popupClose.addEventListener('click', () => {
    popupPlace.close();
    popupForm.reset();
    formValidationPlace.resetError();
});
userEditButton.addEventListener('click', () => {
    popupUser.open();
    userInform.setUserInfo();
    formValidationInfo.setEventListeners();
    formValidationInfo.setSubmitButtonState();
});
popupUserInfoClose.addEventListener('click', () => {
    popupUser.close();
    formValidationInfo.resetError();
});
popupImageClose.addEventListener('click', () => {
    popupPicture.close();
});
formInfo.addEventListener('submit', () => {
    userInform.updateUserInfo();
    popupUser.close();
    formValidationInfo.setSubmitButtonState();
});
popupForm.addEventListener('submit', () => {
    event.preventDefault();
    cardList.addCard(name.value, link.value);
    popupPlace.close();
    popupForm.reset();
    formValidationPlace.setSubmitButtonState();
});


cardList.render(); 


})();