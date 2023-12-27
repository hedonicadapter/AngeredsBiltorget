import { useEffect, useState } from 'react';
import { currentResultCount } from '../nanoStores/resultStore.js';
import { useStore } from '@nanostores/react';

export default function Card(props) {
  const {
    index,
    id,
    price,
    description,
    make,
    model,
    year,
    mileage,
    registrationNumber,
    gearbox,
    fuelType,
    vehicleType,
    color,
    extraFeatures,
    title,
    overrideClass,
    src,
  } = props;

  const $currentResultCount = useStore(currentResultCount);

  const handleAddToCart = () => {
    try {
      let cart = JSON.parse(window.localStorage.getItem('cart') || '[]');

      let existingCarIndex = cart.findIndex((c) => c?.id === id);

      if (existingCarIndex !== -1) {
        cart[existingCarIndex].quantity += 1;
      } else {
        cart.push({ ...props, quantity: 1 });
      }
      window.localStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      console.warn(err);
    }
  };

  const cardClassName = `card-container flex justify-center items-center mx-auto ${overrideClass}}`;

  return (
    <div className={cardClassName}>
      <div className='card flex flex-col items-center z-40'>
        <img
          src={src && src.length > 0 ? src : '/images/placeholder-car.webp'}
          alt={`${title || 'car'}`}
          className='object-contain aspect-square flex-1'
        />
        <h4 className='whitespace-nowrap'>{title || `${make} ${model}`}</h4>
        <p>{price} SEK</p>

        {/* TODO: delete after labbinlämning */}
        <div className='addToCartContainer' style={{ position: 'relative' }}>
          <button
            type='button'
            className='material-symbols-sharp addToCartButton'
            onClick={handleAddToCart}
          >
            add_shopping_cart
          </button>
        </div>
      </div>
    </div>
  );
}
