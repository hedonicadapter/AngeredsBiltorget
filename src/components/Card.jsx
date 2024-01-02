import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { cart } from '../nanoStores/productStore.ts';
import './styles/cards.css';
import { SCMotionDiv } from './MotionComponents.tsx';

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

  const $cart = useStore(cart);

  const handleAddToCart = () => {
    let carExists = $cart?.findIndex((c) => c?.id === id);
    console.log(carExists);
    if (carExists && carExists != -1) return;
    cart.set($cart ? [...$cart, { ...props }] : [{ ...props }]);
  };

  const cardClassName = `card-container relative flex justify-center items-center mx-auto ${overrideClass}}`;

  return (
    <SCMotionDiv className='card hover:outline-on-bg-lightest relative bg-surface-dark hover:bg-surface transition-colors outline outline-outline outline-1 p-8  overflow-visible flex flex-row items-start rounded-[calc(var(--golden-ratio)*0.3em)]'>
      <div className='absolute flex flex-col'>
        <h4 className='text-xl whitespace-nowrap '>
          {title || `${make} ${model}`}
        </h4>
        <p className='text-sm text-on-bg-lightest'>{price} SEK</p>
      </div>
      <img
        // style={{ filter: src ? 'drop-shadow(0px 7px 6px #000000)' : '' }}
        src={src && src.length > 0 ? src : '/images/volvo.webp'}
        alt={`${title || 'car'}`}
        width='200'
        height='200'
        className='origin-center object-contain aspect-video flex-1 '
      />

      {/* TODO: delete after labbinlämning */}
      <button
        type='button'
        className='material-symbols-sharp addToCartButton'
        onClick={handleAddToCart}
      >
        add_shopping_cart
      </button>
    </SCMotionDiv>
  );
}
