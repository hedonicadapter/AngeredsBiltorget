import { cart } from '../nanoStores/productStore';

export default function CheckoutButton() {
  const handleClick = () => {
    cart.set([]);
  };

  return (
    <button onClick={handleClick} className='btn z-50'>
      Checkout
    </button>
  );
}
