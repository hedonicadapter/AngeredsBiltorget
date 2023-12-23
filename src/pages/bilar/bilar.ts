import Car from '../../Models/Car';
import {
  generateDummyCarData,
  getProductCount,
  getProductFiles,
  getProducts,
  upsertProduct,
} from '../../api';
import { DocumentSnapshot } from 'firebase/firestore';

const filterContainer = document.querySelector(
  '.filter-container'
) as HTMLElement;
const carsContainer = document.querySelector('.cars-container') as HTMLElement;

const filterContainerRect = filterContainer?.getBoundingClientRect();
filterContainer?.style.setProperty(
  '--original-position',
  `${filterContainerRect.top}px`
);

const checkboxes = document.querySelectorAll('.custom-dropdown-checkbox');

checkboxes.forEach((el) => {
  const checkbox = el as HTMLInputElement;

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const newTag = document.createElement('custom-tag');

      newTag.setAttribute('text', checkbox.value);
      document.querySelector('.tags-container')?.prepend(newTag);
    } else {
      const tag = document.querySelector(
        `custom-tag[text="${checkbox.value}"]`
      );
      tag?.remove();
    }
  });
});

const setFilterContainerPosition = () => {
  const section = document.querySelector('section.container') as HTMLElement;
  const navbar = document.querySelector('.navbar-top') as HTMLElement;

  section?.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
};

let oldScrollY = 0;

const redirectScrollY = (scrollIncrement = 100) => {
  const scrolledToBottom =
    window.scrollY + window.innerHeight === document.body.scrollHeight;
  const direction = window.scrollY > oldScrollY ? 'down' : 'up';

  console.log(scrollIncrement);

  if (scrolledToBottom) {
    if (direction === 'down')
      carsContainer.scrollBy({
        behavior: 'smooth',
        top: -scrollIncrement * 10,
      });
  }

  if (direction === 'up')
    carsContainer.scrollBy({ behavior: 'smooth', top: scrollIncrement * 10 });
};

const handleWindowScrollAttempt = (event: MouseEvent) => {
  redirectScrollY(event.deltaY);
};

const handleCarsContainerScroll = () => {
  const scrolledToTop = window.scrollY == 0;
  const scrolledToBottom =
    carsContainer.scrollTop ===
    carsContainer.scrollHeight - carsContainer.offsetHeight;
  const direction = window.scrollY > oldScrollY ? 'down' : 'up';

  if (scrolledToBottom) {
    getCars();
  }

  // TODO: what was I cooking?
  if (direction === 'up') {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }

  oldScrollY = window.scrollY;
};

carsContainer.addEventListener('scroll', handleCarsContainerScroll);
window.addEventListener('scroll', setFilterContainerPosition);
window.addEventListener('wheel', handleWindowScrollAttempt);
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    handleWindowScrollAttempt(event);
  }
});

setFilterContainerPosition();

const resultsShowing = document.querySelector(
  '#results-showing'
) as HTMLElement;
if (!resultsShowing.textContent) resultsShowing.textContent = '0';

const resultsAvailable = document.querySelector(
  '#results-available'
) as HTMLElement;

const getInventoryCount = async () => {
  const count = await getProductCount();

  resultsAvailable.textContent = count.toString();
};

let gettingProducts = false; // Prevents multiple requests from being sent at once
let page: number | DocumentSnapshot = 0;
const getCars = async () => {
  if (gettingProducts) return;
  gettingProducts = true;

  const carDocs = await getProducts(page, 16, 'year');

  carDocs.forEach(async (doc, index) => {
    page = doc;
    const fileUrls = await getProductFiles(doc.id);

    const car = doc.data() as Car;
    car.id = doc.id;

    // TODO: delete after labbinlämning
    car.quantity = 1;
    const addToCartContainer = document.createElement('div') as HTMLElement;
    addToCartContainer.className = 'addToCartContainer';
    addToCartContainer.style.position = 'relative';
    const addToCartButton = document.createElement('button');
    addToCartButton.type = 'button';
    addToCartButton.className = 'material-symbols-sharp addToCartButton';
    addToCartButton.innerText = 'add_shopping_cart';
    addToCartButton.addEventListener('click', () => {
      try {
        let cart = JSON.parse(window.localStorage.getItem('cart') || '[]');

        let existingCarIndex = cart.findIndex(
          (c: Car | undefined) => c?.id === car.id
        );

        if (existingCarIndex !== -1) {
          car.quantity = (cart[existingCarIndex] as Car).quantity + 1;
          cart[existingCarIndex] = car;
        } else {
          cart.push(car);
        }
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } catch (err) {
        console.warn(err);
      }
    });
    addToCartContainer.appendChild(addToCartButton);

    const carCard = document.createElement('card-sm') as HTMLElement;
    carCard.setAttribute('title', car.title || '');
    carCard.setAttribute('model', car.model);
    carCard.setAttribute('make', car.make);
    carCard.setAttribute('price', car.price?.toString());

    const thumbnail =
      fileUrls.find((file) => file.name.startsWith('thumbnail'))?.url || '';

    carCard.setAttribute('src', thumbnail);

    // TODO: delete after labbinlämning
    addToCartContainer.appendChild(carCard);
    carsContainer.appendChild(addToCartContainer);

    // TODO: reenable after labbinlämning
    // carsContainer.appendChild(carCard);

    setTimeout(() => {
      carCard.classList.add('visible');
      gettingProducts = false;
    }, index * 100);

    setTimeout(() => {
      const incrementedResultsShowing = `${
        parseInt(resultsShowing.textContent!) + 1
      }`;
      resultsShowing.textContent = incrementedResultsShowing;
    }, index * 50);
  });
};

getCars();

getInventoryCount();
