import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cart } from '../nanoStores/productStore.ts';
import './styles/cards.css';
import { SCMotionDiv, SCMotionP } from './MotionComponents.tsx';

export function CarCard(props) {
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
    interactive,
  } = props;

  const $cart = useStore(cart);
  const [cardHovered, setCardHovered] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(50);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!descriptionRef || !descriptionRef.current) return;
    setDescriptionHeight(descriptionRef.current.offsetHeight - 10);
  }, [descriptionRef]);

  const handleAddToCart = () => {
    let carExists = $cart?.findIndex((c) => c?.id === id);
    if (carExists && carExists != -1) return;
    cart.set($cart ? [...$cart, { ...props }] : [{ ...props }]);
  };

  return (
    <SCMotionDiv
      onMouseEnter={() => interactive && setCardHovered(true)}
      onMouseLeave={() => interactive && setCardHovered(false)}
      className={`car-card relative hover:outline-on-bg-lightest bg-surface-dark hover:bg-surface transition-colors outline outline-outline outline-1 p-8  overflow-visible flex flex-col items-start rounded-[calc(var(--golden-ratio)*0.3em)] ${overrideClass}`}
    >
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
        className='flex-1 object-contain mx-auto origin-center aspect-video '
      />

      <SCMotionDiv
        ref={descriptionRef}
        variants={{
          expand: {
            y: descriptionHeight,
            opacity: 1,
            transition: { ease: 'easeOut', duration: 0.15 },
          },
          contract: {
            y: 0,
            opacity: 0,
            transition: { ease: 'linear', duration: 0.1 },
          },
        }}
        animate={cardHovered ? 'expand' : 'contract'}
        className={`box-border absolute bottom-0 left-0 right-0 -mx-[1px] z-50 ${
          cardHovered ? 'pointer-events-auto' : 'pointer-events-none'
        } bg-surface transition-colors border-b border-l border-r border-on-bg-lightest border-1 rounded-b-[calc(var(--golden-ratio)*0.3em)]
        `}
      >
        <p className='p-4 text-on-bg-light'>{description}</p>
      </SCMotionDiv>

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

export const Card = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='flex flex-col overflow-hidden transition-opacity outline-none rounded-2xl outline outline-1 active:opacity-40'
    >
      <img class='inline m-0 object-cover' src='/images/carpark.png' />
      <SCMotionDiv
        animate={
          hovered
            ? { borderBottomColor: 'var(--primary)' }
            : { borderBottomColor: 'var(--outline)' }
        }
        className='flex flex-row justify-between px-5 py-6 border border-1 border-outline rounded-b-2xl'
      >
        <div className='flex flex-col'>
          <h4 className='mb-2'>Stort utbud</h4>
          <SCMotionP
            animate={
              hovered
                ? { color: 'var(--on-bg)' }
                : { color: 'var(--on-bg-lightest)' }
            }
            className='text-[calc(var(--golden-ratio)*0.5em)]'
          >
            Välkommen in och hitta drömbilen.
          </SCMotionP>
        </div>
        <SCMotionDiv
          animate={hovered ? { opacity: 1, x: 5 } : { opacity: 0.8, x: 0 }}
          className='my-auto material-symbols-sharp'
        >
          chevron_right
        </SCMotionDiv>
      </SCMotionDiv>
    </a>
  );
};
