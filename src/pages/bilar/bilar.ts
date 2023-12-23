import Car from '../../Models/Car';
import {
  generateDummyCarData,
  getProductCount,
  getProductFiles,
  getProducts,
  upsertProduct,
} from '../../api';
import { DocumentSnapshot } from 'firebase/firestore';

console.log('hello');

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
const handleCarsContainerScroll = () => {
  const direction = window.scrollY > oldScrollY ? 'down' : 'up';

  if (
    carsContainer.scrollTop ===
    carsContainer.scrollHeight - carsContainer.offsetHeight
  ) {
    console.log('scrolled to bottom');
    getCars();
  }

  if (direction === 'up') {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }

  oldScrollY = window.scrollY;
};

carsContainer.addEventListener('scroll', handleCarsContainerScroll);
window.addEventListener('scroll', setFilterContainerPosition);
setFilterContainerPosition();

const resultsShowing = document.querySelector(
  '#results-showing'
) as HTMLElement;
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
    // console.log(car);
    const carCard = document.createElement('card-sm') as HTMLElement;
    carCard.setAttribute('title', car.title || '');
    carCard.setAttribute('model', car.model);
    carCard.setAttribute('make', car.make);
    carCard.setAttribute('price', car.price?.toString());

    const thumbnail =
      fileUrls.find((file) => file.name.startsWith('thumbnail'))?.url || '';

    carCard.setAttribute('src', thumbnail);
    carsContainer.appendChild(carCard);

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

if (!resultsShowing.textContent) resultsShowing.textContent = '0';
getInventoryCount();
