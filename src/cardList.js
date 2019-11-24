import { Card } from "./card";

export class CardList {
  constructor(placesList, initialCards, onOpenCard) {
    this.placesList = placesList;
    this.initialCards = initialCards;
    this.onOpenCard = onOpenCard;
  }

  addCard(model) {
    const { name, link } = model;
    const { el } = new Card(name, link, this.onOpenCard);
    this.placesList.appendChild(el);
  }

  render() {
    this.initialCards.forEach(model => {
      const { el } = new Card(model.name, model.link, this.onOpenCard);
      this.placesList.appendChild(el);
    });
  }
}
