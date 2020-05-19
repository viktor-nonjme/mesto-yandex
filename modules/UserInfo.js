class UserInfo {
    constructor(popup, profile) {
        this.popup = popup;
        this.profile = profile;
    }
    setUserInfo() {
        const formInfo = this.popup
        .querySelector('.popup__form');

        const userInfoName = this.profile
        .container.querySelector('.user-info__name');
        const userInfoJob = this.profile
        .container.querySelector('.user-info__job');
        
        formInfo.sign.value = userInfoName.textContent; 
        formInfo.about.value = userInfoJob.textContent;

    }
    updateUserInfo() {
        event.preventDefault();

        const formInfo = this.popup
        .querySelector('.popup__form');

        const userInfoName = this.profile
        .container.querySelector('.user-info__name');
        const userInfoJob = this.profile
        .container.querySelector('.user-info__job');

        userInfoName.textContent = formInfo.sign.value; 
        userInfoJob.textContent = formInfo.about.value;
        
    }
}