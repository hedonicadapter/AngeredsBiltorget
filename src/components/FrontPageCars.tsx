import React, { useEffect, useRef } from 'react';
import { CarCard } from './Cards.jsx';
import {
  SCMotionDiv,
  WhileInViewVariantsNoTransition,
} from './MotionComponents.jsx';
import { useMediaQuery } from '../util/helpers.js';
import { useScroll } from '@use-gesture/react';

const transition = {
  duration: 0.55,
};

export default function FrontPageCars() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const horizontallyScrollableGuy = useRef<HTMLDivElement | null>(null);

  useScroll(({ xy: [, y] }) => console.log('allo'), { target: window });

  // useEffect(() => {
  //   const scrollContainer = horizontallyScrollableGuy.current;
  //   if (scrollContainer) {
  //     scrollContainer.scrollLeft = ; // or use scrollContainer.scrollBy({ left: 1000, top: 0, behavior: 'smooth' });
  //   }
  // }, []);
  // useScroll((evt, direction) => {
  //   if (horizontallyScrollableGuy.current) {
  //     if (direction.x === 'left') {
  //       horizontallyScrollableGuy.current.scrollLeft -= window.innerWidth;
  //     } else if (direction.x === 'right')
  //       horizontallyScrollableGuy.current.scrollLeft += window.innerWidth;
  //   }
  // });

  return (
    <div ref={horizontallyScrollableGuy} className='flex-1 cards-container'>
      <SCMotionDiv
        // staggerChildren and delayChildren aren't working so im going manual
        transition={isMobile ? transition : { delay: 0.25, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='1'
      >
        <CarCard title='Yoyota' price='1.99' />
      </SCMotionDiv>
      <SCMotionDiv
        transition={isMobile ? transition : { delay: 0.5, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='2'
      >
        <CarCard title='Yoyota' price='1.99' />
      </SCMotionDiv>
      <SCMotionDiv
        transition={isMobile ? transition : { delay: 0.75, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='3'
      >
        <CarCard title='Din bil?' price='Ditt pris' />
      </SCMotionDiv>
    </div>
  );
}
