class CardSM extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'price'];
  }

  constructor() {
    super();
    this.className = 'card-container';
  }

  attributeChangedCallback(name) {
    if (name === 'title' || name === 'price') {
      this.render();
    }
  }

  render() {
    const card = document.createElement('div');
    card.className += 'card flex flex-col justify-evenly items-center';

    const img = document.createElement('img');
    img.src = this.getAttribute('src') ?? '/images/placeholder-car.webp';
    img.alt = `Picture of ${this.getAttribute('title') || 'car'}`;

    const header = document.createElement('h4');
    header.textContent = this.getAttribute('title');

    const text = document.createElement('p');
    text.innerText = this.getAttribute('price');

    card.append(img, header, text);
    console.log(card);
    this.appendChild(card);
  }
}

customElements.define('card-sm', CardSM);
