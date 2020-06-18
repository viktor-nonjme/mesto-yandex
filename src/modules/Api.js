export default class Api {
    constructor(options) {
        this.options = options;
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.checkStatus);
    }
    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.checkStatus);
    }
    updateUser(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this.checkStatus);
    }
    postCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this.checkStatus);
    }
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this.checkStatus);
    }
    like(id) {
        return fetch(`${this.baseUrl}/cards/like/${id}`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this.checkStatus);
    }
    disLike(id) {
        return fetch(`${this.baseUrl}/cards/like/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this.checkStatus);
    }
    avatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this.checkStatus);
    }
    checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

} 
