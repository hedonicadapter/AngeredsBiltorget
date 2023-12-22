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

  section.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
};

let oldScrollY = 0;
const handleCarsContainerScroll = () => {
  const direction = window.scrollY > oldScrollY ? 'down' : 'up';

  if (direction === 'up' && oldScrollY == 0) {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }

  oldScrollY = window.scrollY;
};

carsContainer.addEventListener('scroll', handleCarsContainerScroll);
window.addEventListener('scroll', setFilterContainerPosition);
setFilterContainerPosition();
