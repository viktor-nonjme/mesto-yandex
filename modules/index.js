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
const avatarPopup = rootContainer.container.querySelector('.popup_avatar');
const formAvatar = document.forms.avatar;
const closeAvatar = rootContainer.container.querySelector('.close__avatar');
const spinnerHTML = rootContainer.container.querySelector('.spinner');

//объект с ошибками валидации
const ERROR_MESSAGES = {

    tooShort: 'Должно быть от 2 до 30 символов',
    valueMissing: 'Это обязательное поле', 
    typeMismatch: 'Здесь должна быть ссылка'
}

//вызов функций
const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '4ae09ffa-715b-4c73-a26a-12d26e6bab8e',
      'Content-Type': 'application/json'
    }
});

const owner = new Owner()
const card = new Card(api, owner);
const spinner = new Spinner(placeList, spinnerHTML)
const cardList = new CardList(placeList, card, api, spinner)
const popupPlace = new Popup(popup, api, cardList);
const popupUser = new PopupUser(popupUserInfo, popupUserInfo);
const popupPicture = new PopupImage(popupImage, popupImageImg);
const profile = new Profile(userInfo);
const userInform = new UserInfo(popupUserInfo, profile, api, owner, popupUser);
const error =  new Error(ERROR_MESSAGES);
const formValidationPlace = new FormValidator(popupForm, error.errors);
const formValidationInfo = new FormValidator(formInfo, error.errors);
const formValidationAvatar = new FormValidator(formAvatar, error.errors);
const popupAvatar = new PopupAvatar(avatarPopup, api, profile);

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
    formValidationInfo.setSubmitButtonState();
});
popupForm.addEventListener('submit', () => {
    event.preventDefault();
    popupPlace.submit();
    popupForm.reset();
    formValidationPlace.setSubmitButtonState();
});
formAvatar.addEventListener('submit', () => {
    event.preventDefault();
    popupAvatar.updateAvatar();
    popupAvatar.close();
    formAvatar.reset();
    formValidationAvatar.setSubmitButtonState();
});
profile.container.addEventListener('click', (event) => {
    formValidationAvatar.setEventListeners();
    formValidationAvatar.setSubmitButtonState();
    popupAvatar.open(event);
});
closeAvatar.addEventListener('click', () => {
    popupAvatar.close();
    formValidationAvatar.resetError();
    formAvatar.reset();
})

userInform.setUserInfo()
cardList.render();

})();