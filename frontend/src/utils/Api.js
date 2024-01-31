export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  getInfoUser() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  updateUserInfo(userData) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(this._checkResponse);
  }

  addNewCard(newCardData) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardData.description,
        link: newCardData.image
      })
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }

  updateUserAvatar(data) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    // authorization: '73e5a98c-079b-4b9e-b964-5323cdfb16c2',
    'Content-Type': 'application/json'
  }
});