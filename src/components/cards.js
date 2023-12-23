class CardSM extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id');
    const price = this.getAttribute('price');
    const description = this.getAttribute('description');
    const make = this.getAttribute('make');
    const model = this.getAttribute('model');
    const year = this.getAttribute('year');
    const mileage = this.getAttribute('mileage'); // Mätarställning
    const registrationNumber = this.getAttribute('registrationNumber'); // Registreringsnummer
    const gearbox = this.getAttribute('gearbox'); // Växellåda
    const fuelType = this.getAttribute('fuelType'); // Drivmedel
    const vehicleType = this.getAttribute('vehicleType'); // Fordonstyp
    const color = this.getAttribute('color');
    const extraFeatures = this.getAttribute('extraFeatures'); // Extra features

    const title = this.getAttribute('title') || `${make} ${model}`;

    this.className = `card-container ${this.getAttribute('className')}`;

    const card = document.createElement('div');
    card.className += 'card flex flex-col items-center';

    const img = document.createElement('img');
    const src = this.getAttribute('src');
    img.src = src && src.length > 0 ? src : '/images/placeholder-car.webp';
    img.alt = `Picture of ${title || 'car'}`;

    const header = document.createElement('h4');
    header.textContent = title;

    const text = document.createElement('p');
    text.innerText = price;

    card.append(img, header, text);
    this.appendChild(card);
  }
  constructor() {
    super();
  }
}

customElements.define('card-sm', CardSM);
