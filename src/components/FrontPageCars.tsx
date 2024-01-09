import React, { useEffect, useRef } from 'react';
import { CarCard } from './Cards.jsx';
import {
  SCMotionDiv,
  WhileInViewVariantsNoTransition,
} from './MotionComponents.jsx';
import { useMediaQuery } from '../util/helpers.js';
import { useScroll } from '@use-gesture/react';
import { useInView } from 'framer-motion';
import { lastCarInView } from '../nanoStores/uiStore.js';

const transition = {
  duration: 0.75,
  easing: 'ease-out',
};

export default function FrontPageCars() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const horizontallyScrollableGuy = useRef<HTMLDivElement | null>(null);
  const [x, setX] = React.useState(0);
  const [direction, setDirection] = React.useState('down');
  const lastCarRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(lastCarRef);

  // TODO: hämta 3 favoritbilar från db

  useEffect(() => {
    if (isInView) {
      lastCarInView.set(true);
    } else {
      lastCarInView.set(false);
    }
  }, [isInView]);

  useScroll(
    (state) => {
      const scrollContainer = horizontallyScrollableGuy.current;
      if (scrollContainer) {
        const direction = state.direction[1] == 1 ? 'down' : 'up';
        if (window.scrollY < window.innerHeight) {
          scrollContainer.scrollLeft = 0;
          return;
        }

        if (direction == 'down') scrollContainer.scrollLeft += 20;
        if (direction == 'up') scrollContainer.scrollLeft -= 20;
      }
    },
    { target: window }
  );

  return (
    <div
      ref={horizontallyScrollableGuy}
      className='flex-1 overflow-x-scroll cards-container'
    >
      <SCMotionDiv
        // staggerChildren and delayChildren aren't working so im going manual
        transition={transition}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='1'
      >
        <div className='relative min-w-[300vw]'>
          <div className='sticky left-0 right-0 w-screen p-[calc(var(--golden-ratio)*1.5em)]'>
            <CarCard title='Yoyota' price='1.99' />
          </div>
        </div>
      </SCMotionDiv>
      <SCMotionDiv
        transition={transition}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='2'
      >
        <div className='relative min-w-[300vw]'>
          <div className='sticky left-0 right-0 w-screen p-[calc(var(--golden-ratio)*1.5em)]'>
            <CarCard title='Yoyota' price='1.99' />
          </div>
        </div>
      </SCMotionDiv>
      <SCMotionDiv
        transition={transition}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        ref={lastCarRef}
        key='3'
      >
        <div className='relative min-w-[300vw]'>
          <div className='sticky left-0 right-0 w-screen p-[calc(var(--golden-ratio)*1.5em)]'>
            <CarCard
              href={isInView ? '/sell' : undefined}
              title='Din bil?'
              price='Ditt pris'
            />
          </div>
        </div>
      </SCMotionDiv>
    </div>
  );
}
