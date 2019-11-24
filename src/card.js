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

export class Card {
  constructor(name, link, onOpen) {
    this.name = name;
    this.link = link;
    this.onOpen = onOpen;
    this.el = this.create(name, link);
    this.placeCardImage = this.el.querySelector(".place-card__image");
    this.likeButton = this.el.querySelector(".place-card__like-icon");
    this.deleteButton = this.el.querySelector(".place-card__delete-icon");
    this.placeCardImage.addEventListener("click", ev => this.open(ev));
    this.likeButton.addEventListener("click", () => this.like());
    this.deleteButton.addEventListener("click", () => this.remove());
  }

  open(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      // Удаление карточки
      return;
    } else {
      const imageSrc = event.target.style.backgroundImage.slice(5, -2);
      this.onOpen(imageSrc);
    }
  }

  like() {
    this.likeButton.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.el.remove(this.el);
  }

  create(name, link) {
    const wrap = document.createElement("div");
    wrap.innerHTML = cardTpl;
    wrap.querySelector(".place-card__name").textContent = this.name;
    wrap.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.link})`;
    return wrap.firstElementChild;
  }
}
