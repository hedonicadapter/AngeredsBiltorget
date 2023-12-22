import { clearTimeouts } from '../../util/helpers';
import { whileInView } from '../../util/intersection-observer';

let timeouts: NodeJS.Timeout[] = [];

const setCardsVisible = () => {
  const cards = document.querySelectorAll('.inne-just-nu .card-container');
  if (!cards) return;

  clearTimeouts(timeouts);

  cards.forEach((card, index) => {
    const timeout = setTimeout(() => {
      card.classList.add('visible');
      card.classList.remove('invisible');
    }, (index + 0.5) * 650);

    timeouts.push(timeout);
  });
};

const setCardsInVisible = () => {
  const cards = document.querySelectorAll('.inne-just-nu .card-container');
  if (!cards) return;

  clearTimeouts(timeouts);

  for (let i = cards.length; i >= 0; i--) {
    const timeout = setTimeout(() => {
      cards[i].classList.remove('visible');
      cards[i].classList.add('invisible');
    }, i * 100);

    timeouts.push(timeout);
  }
};

whileInView(
  document.querySelector('.sticky-just-nu') as HTMLElement,
  setCardsVisible,
  setCardsInVisible
);

const container = document.querySelector('.inne-just-nu');
const cardsContainer = document.querySelector('.cards-container');

window.addEventListener('scroll', () => {
  const rect = container!.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollTop;

  const scrollPos = Math.max(scrollTop - elementTop, 0);
  const maxScroll = rect.height - window.innerHeight;

  let scrollPercentage = (scrollPos / maxScroll) * 100;

  scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
  console.log(cardsContainer!.children);

  (cardsContainer as HTMLElement).scrollLeft =
    scrollPercentage * 0.01 * cardsContainer!.scrollWidth;
});
