class Api {
  constructor(groupId, token, host) {
    this.groupId = groupId;
    this.token = token;
    this.host = host;
  }

  /**
   * Хорошо запросы составлены верно и корректно передают данные
   */

  /**
   * Можно улучшить
   * 
   * При нескольких передаваемых параметрах лучше
   * использовать объект так будет не важен порядок элементов
   * и меньше вероятности получения ошибок 
   * 
   * из объекта можно извлечь имена переменных
   * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2
   * 
   * через деструктуризацию ({ groupId, token, host })
   */

  getCards() {
    return fetch(`http://${this.host}/${this.groupId}/cards`, {
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
    return fetch(`http://${this.host}/${this.groupId}/users/me`, {
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
    return fetch(`http://${this.host}/${this.groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: job
      }) // Можно улучшить если назвать второй ключ about
      // запись выйдет сократить до { name, about }
      // дублирование ключей не обязательно при совпадении
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
