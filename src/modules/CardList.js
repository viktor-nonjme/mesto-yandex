export default class CardList {
    constructor(container, card, api, spinner) {
        this.container = container;
        this.card = card; 
        this.api = api;
        this.spinner = spinner;
    }
    addCard(name, link, usersLikes, likes, cardId, cardOwnerId) {
        this.container
            .appendChild(this.card.create(
                name, 
                link, 
                usersLikes,
                likes,
                cardId,
                cardOwnerId
            ));
    }
    render() {
        this.spinner.renderLoading(true);
        this.api.getCards()
        .then(cards => {
            let reg = /([а-яё]{12,})/gi;
            return cards.filter(item => reg.test(item.name));
            }) 
            .then(cards => {
                cards.forEach(el => {
                    this.addCard(
                        el.name, 
                        el.link, 
                        el.likes,
                        el.likes.length,
                        el._id,
                        el.owner._id
                    );
                })
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.spinner.renderLoading(false);
            });
    }
}