class UserInfo {
    constructor(popup, profile, api, owner, popupUser) {
        this.popup = popup;
        this.profile = profile;
        this.api = api;
        this.owner = owner;
        this.popupUser = popupUser;
        this.formInfo = this.popup
        .querySelector('.popup__form');
        this.userInfoName = this.profile
        .container.querySelector('.user-info__name');
        this.userInfoJob = this.profile
        .container.querySelector('.user-info__job');
        this.avatar = this.profile
        .container.querySelector('.user-info__photo');
        this.submit = this.formInfo
        .querySelector('#submit');
    }
    setUserInfo() {

        this.api.getUser()
        .then(user => {

            this.owner.id = user._id;
            this.formInfo
            .sign.value = user.name; 
            this.formInfo
            .about.value = user.about;
            this.avatar
            .style.backgroundImage = `url(${user.avatar})`;

            this.userInfoName
            .textContent = user.name; 
            this.userInfoJob
            .textContent = user.about;
        })
        .catch(err => {
            console.log(err);
        })
    }
    updateUserInfo() {
        event.preventDefault();
        this.submit
            .textContent = 'Загрузка...';
        this.api.updateUser(
            this.formInfo.sign.value,
            this.formInfo.about.value
        )
        .then(user => {
            this.userInfoName
            .textContent = user.name; 
            this.userInfoJob
            .textContent = user.about;
        })
        .then(() => {
            this.popupUser.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            this.submit
            .textContent = 'Сохранить';
        })
    }
}