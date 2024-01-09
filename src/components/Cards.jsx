import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { cart } from '../nanoStores/productStore.ts';
import './styles/cards.css';
import { SCMotionAnchor, SCMotionDiv, SCMotionP } from './MotionComponents.tsx';
import { formatter } from '../util/helpers.ts';

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
    <SCMotionAnchor
      href={props.href || `/products/${id}`}
      onMouseEnter={() => interactive && setCardHovered(true)}
      onMouseLeave={() => interactive && setCardHovered(false)}
      className={`car-card relative  bg-surface-dark hover:bg-surface transition-colors outline outline-transparent outline-1 p-8  overflow-visible flex flex-col items-start rounded-[calc(var(--golden-ratio)*0.3em)] ${overrideClass}`}
    >
      <div className='absolute flex flex-col'>
        <h4 className='text-xl whitespace-nowrap '>
          {title || `${make} ${model}`}
        </h4>
        <p className='text-sm text-on-bg-lightest'>
          {price === 'Ditt pris' ? price : formatter.format(price)}
        </p>
      </div>
      <img
        style={{ transitionName: `thumbnail-${id}` }}
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
        } bg-surface transition-colors rounded-b-[calc(var(--golden-ratio)*0.3em)]
        `}
      >
        <div className='flex flex-row flex-wrap items-center gap-6 p-4'>
          <div className='flex flex-row items-center gap-2 text-on-bg-light'>
            <div className='text-xs material-symbols-rounded'>ev_charger</div>
            {fuelType}
          </div>
          <div className='flex flex-row items-center gap-2 text-on-bg-light'>
            <div className='text-xs material-symbols-rounded'>
              swap_driving_apps_wheel
            </div>
            {mileage}
          </div>
          <div className='flex flex-row items-center gap-2 text-on-bg-light'>
            <div className='text-xs material-symbols-rounded'>pin</div>
            {registrationNumber}
          </div>
        </div>
      </SCMotionDiv>

      {/* TODO: delete after labbinlämning */}
      <button
        type='button'
        className='material-symbols-rounded addToCartButton'
        onClick={handleAddToCart}
      >
        add_shopping_cart
      </button>
    </SCMotionAnchor>
  );
}

export const Card = ({ title, paragraph, src }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='flex flex-col overflow-hidden transition-opacity outline-none rounded-2xl outline outline-1 active:opacity-40'
    >
      <img className='inline object-cover m-0' src={src} />
      <SCMotionDiv
        animate={
          hovered
            ? { borderBottomColor: 'var(--primary)' }
            : { borderBottomColor: 'var(--outline)' }
        }
        className='flex flex-row justify-between px-5 py-6 border border-1 border-outline rounded-b-2xl'
      >
        <div className='flex flex-col'>
          <h4 className='mb-2'>{title}</h4>
          <SCMotionP
            animate={
              hovered
                ? { color: 'var(--on-bg)' }
                : { color: 'var(--on-bg-lightest)' }
            }
            className='text-[calc(var(--golden-ratio)*0.5em)]'
          >
            {paragraph}
          </SCMotionP>
        </div>
        <SCMotionDiv
          animate={hovered ? { opacity: 1, x: 2 } : { opacity: 0.8, x: -2 }}
          className='my-auto material-symbols-rounded'
        >
          chevron_right
        </SCMotionDiv>
      </SCMotionDiv>
    </a>
  );
};
