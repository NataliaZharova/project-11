export class Api {
  constructor(token, serverUrl) {
    this.token = token;
    this.serverUrl = serverUrl;
  }

  getCards() {
    return fetch(`${this.serverUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log("Ошибка. Запрос не выполнен: ", err);
        return err;
      });
  }

  getUser() {
    return fetch(`${this.serverUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log("Ошибка. Запрос не выполнен: ", err);
        return err;
      });
  }

  saveUser(name, job) {
    return fetch(`${this.serverUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log("Ошибка. Запрос не выполнен: ", err);
        return err;
      });
  }
}
