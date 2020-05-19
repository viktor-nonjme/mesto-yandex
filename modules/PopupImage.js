class PopupImage extends Popup {
    constructor(popup, popupImg) {
        super(popup)
        this.popupImg = popupImg;
    }
    open() {
        if (event.target.classList.contains('place-card__image')) {

            this.popup
            .classList.toggle('popup-image_is-opened'); 
            this.popupImg
            .src = event.target.style.backgroundImage.slice(5, -2);

        }
    }
    close() {
        if (event.target.classList.contains('popup-image__close')) {
            this.popup
            .classList.toggle('popup-image_is-opened');
        }
    }
}