const CLASS_OPENED = "popup_is-opened";

export class Popup {
  constructor(el) {
    this.el = el;
    this.root = document.querySelector(".root");
    this.resetButton = this.root.querySelector(".popup__close");
    this.resetButtonInfo = this.root.querySelector(".popup_info .popup__close");
    this.resetButton.addEventListener("click", () => this.close());
    this.resetButtonInfo.addEventListener("click", () => this.close());
  }

  open() {
    this.el.classList.add(CLASS_OPENED);
  }

  close() {
    this.el.classList.remove(CLASS_OPENED);
  }
}
