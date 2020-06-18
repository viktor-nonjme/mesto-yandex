export default class Popup {
    constructor(popup, api, cardList) {
        this.popup = popup;
        this.api = api;
        this.cardList = cardList;
        this.popupForm = this.popup.querySelector('#form');
    }
    open() {
        this.popup.classList.toggle('popup_is-opened');
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
    submit() {
        const { name, link, submit } = this.popupForm.elements;
        submit.textContent = 'Загрузка...';
        this.api.postCard(name.value, link.value)
            .then(card => {
                this.cardList.addCard(
                    card.name,
                    card.link,
                    card.likes,
                    card.likes.length,
                    card._id,
                    card.owner._id
                );
            })
            .then(() => {
                this.close()
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                submit.textContent = '+';
            });
    }
}