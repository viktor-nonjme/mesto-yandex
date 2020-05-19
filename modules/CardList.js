class CardList {
    constructor(container, array, card) {
        this.container = container;
        this.array = array; 
        this.card = card; 
    }
    addCard(name, link) {
        this.container.appendChild(this.card.create(name, link));
    }
    render() {
        this.array.forEach(el => {
            this.addCard(el.name, el.link);
        });
    }
}