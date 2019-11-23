class CardList {
  constructor(placesList, initialCards) {
    this.placesList = placesList;
    this.initialCards = initialCards;
  }

  addCard(model) {
    const { el } = new Card();
    this.placesList.appendChild(el);
    /**
     * Можно улучшить 
     * 
     * Логика не работает - лучше вызывать внутри цикла
     * с отправкой параметров в класс
     */
  }

  render() {
    this.initialCards.forEach(model => {
      const { el } = new Card(model.name, model.link);
      this.placesList.appendChild(el);
      // this.addCard
    });
  }
}
