class Card {
    constructor(api, owner) {
        this.api = api;
        this.owner = owner;
    }
    create(name, link, usersLikes, likes, cardId, cardOwnerId) {

        let displayDeleteIcon = 
        this.owner.id === cardOwnerId ? 'block' : 'none';

        const placeCard = document.createElement('div'); 
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeContainer = document.createElement('div');
        const placeCardLikeIcon = document.createElement('button');
        const placeCardLikesCount = document.createElement('p');

        placeCard.classList.add('place-card'); 
        placeCard.setAttribute('id', `${cardId}`);
        placeCard.setAttribute('owner-id', `${cardOwnerId}`);
        placeCardImage.classList.add('place-card__image');
        placeCardImage.style.backgroundImage = `url(${link})`;
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDeleteIcon.style.display = displayDeleteIcon;
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = name;
        placeCardLikeContainer.classList.add('place-card__like-container');
        placeCardLikeIcon.classList.add('place-card__like-icon');
        placeCardLikesCount.classList.add('place-card__likes-count');
        placeCardLikesCount.textContent = likes;

        const isLiked = usersLikes.some(like => this.owner.id === like._id);
        
        if (isLiked) {
            placeCardLikeIcon
            .classList.add('place-card__like-icon_liked');
        }

        placeCard.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteIcon);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeContainer);
        placeCardLikeContainer.appendChild(placeCardLikeIcon);
        placeCardLikeContainer.appendChild(placeCardLikesCount);

        return placeCard; 
    }
    like(event) {

        if (event.target.classList.contains('place-card__like-icon')) {

            const placeCardLikesCount = 
            event.target.closest('.place-card')
            .querySelector('.place-card__likes-count');

            this.api.like(event.target.closest('.place-card').id)
                .then(card => {
                    event.target.classList
                    .add('place-card__like-icon_liked');
                    placeCardLikesCount
                    .textContent = card.likes.length;
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if (event.target.classList.contains('place-card__like-icon_liked')) {

            const placeCardLikesCount = 
            event.target.closest('.place-card')
            .querySelector('.place-card__likes-count');

            this.api.disLike(event.target.closest('.place-card').id)
                .then(card => {
                    event.target.classList
                    .remove('place-card__like-icon_liked');
                    placeCardLikesCount
                    .textContent = card.likes.length;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (confirm('Вы действительно хотите удалить карточку?')) {
                this.api
                .deleteCard(event.target.closest('.place-card').id)
                event.target
                .closest('.place-card').remove();
            }
        }
    }
}



