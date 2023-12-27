import React from 'react';
import Card from './Card.jsx';

export default function FrontPageCars() {
  return (
    <>
      <Card className='invisible' title='Yoyota' price='1.99' />
      <Card className='invisible' title='Yoyota' price='1.99' />
      <Card className='invisible' title='Din bil?' price='Ditt pris' />
    </>
  );
}
