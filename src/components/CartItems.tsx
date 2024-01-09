import { useState } from 'react';
import { cart } from '../nanoStores/productStore';
import type Car from '../Models/Car';
import { useStore } from '@nanostores/react';
import { SCMotionButton, SCMotionDiv } from './MotionComponents';
import { motion } from 'framer-motion';
import { currencyFormatter } from '../util/helpers';

export default function CartItems() {
  const $cart = useStore(cart);

  return (
    <div className='flex flex-col w-full gap-5'>
      {$cart?.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.15 * i }}
          className='z-50 flex items-center justify-between cursor-pointer btn'
        >
          <div className='flex flex-col gap-2'>
            <h5>{item.title || `${item.make} ${item.model}`}</h5>
          </div>
          <div className='flex flex-row gap-4'>
            <p>{currencyFormatter.format(item.price)}</p>
            <div className='material-symbols-rounded tag-cross'>
              close_small
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
