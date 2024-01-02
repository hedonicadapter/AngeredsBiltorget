import React from 'react';
import Card from './Card.jsx';
import {
  SCMotionDiv,
  WhileInViewVariantsNoTransition,
} from './MotionComponents.jsx';
import { useMediaQuery } from '../util/helpers.js';

const transition = {
  duration: 0.55,
};

export default function FrontPageCars() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className='cards-container flex-1 overflow-y-visible'>
      <SCMotionDiv
        // staggerChildren and delayChildren aren't working so im going manual
        transition={isMobile ? transition : { delay: 0.25, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='1'
      >
        <Card title='Yoyota' price='1.99' />
      </SCMotionDiv>
      <SCMotionDiv
        transition={isMobile ? transition : { delay: 0.5, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='2'
      >
        <Card title='Yoyota' price='1.99' />
      </SCMotionDiv>
      <SCMotionDiv
        transition={isMobile ? transition : { delay: 0.75, ...transition }}
        variants={WhileInViewVariantsNoTransition}
        initial={'hide'}
        whileInView={'show'}
        key='3'
      >
        <Card title='Din bil?' price='Ditt pris' />
      </SCMotionDiv>
    </div>
  );
}
