class PopupAvatar extends Popup {
    constructor(popup, api, profile) {
        super(popup, api);
        this.profile = profile;
        this.form = this.popup.querySelector('.form__avatar');
        this.ava = this.profile.container.querySelector('.user-info__photo');
    }
    open(event) {
        if (event.target.classList.contains('user-info__photo')) {
            this.popup.classList.toggle('popup_is-opened');
        }
    }
    updateAvatar() {
        const { avatar } = this.form.elements;
        this.api.avatar(avatar.value)
            .then(user => {
                this.ava.style.backgroundImage = `url(${user.avatar})`;
            })
            .catch(err => {
                console.log(err);
            });
    }
}