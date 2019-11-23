const cardTpl = `
  <div class="place-card">
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`;

class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.el = this.create(name, link);
    // параметры из create можно убрать они не используются
    this.placeCardImage = this.el.querySelector(".place-card__image");
    this.likeButton = this.el.querySelector(".place-card__like-icon");
    this.deleteButton = this.el.querySelector(".place-card__delete-icon");
    this.placeCardImage.addEventListener("click", openImage);
    this.likeButton.addEventListener("click", () => this.like());
    this.deleteButton.addEventListener("click", () => this.remove());
  }

  like() {
    this.likeButton.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.el.remove(this.el);
    // Можно улучшить достаточно удалять элемент 
    // this.el.remove() метод удаления не принимает параметров

    // кроме удаления карточки важно удалить все добавленные обработчики
    // через removeEventListener

  }

  create(name, link) {
    const wrap = document.createElement("div");
    wrap.innerHTML = cardTpl;
    wrap.querySelector(".place-card__name").textContent = this.name;
    wrap.querySelector(".place-card__image").style.backgroundImage = `url(${
      this.link
    })`;
    return wrap.firstElementChild; // Можно улучшить firstChild достаточно
  }
}
