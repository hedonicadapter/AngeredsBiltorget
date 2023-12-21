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
    }, (index + 1) * 650);

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
