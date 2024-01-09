import { useState } from 'react';
import { SCMotionAnchor, SCMotionDiv } from './MotionComponents';
import { useStore } from '@nanostores/react';
import { lastCarInView } from '../nanoStores/uiStore';
import { AnimatePresence } from 'framer-motion';

export default function ShowAllButton() {
  const [hovered, setHovered] = useState(false);
  const $lastCarInView = useStore(lastCarInView);

  return (
    <AnimatePresence mode='wait'>
      <SCMotionAnchor
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={`${$lastCarInView}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        href={$lastCarInView ? '/sell' : '/showroom'}
        className='z-40 flex flex-row items-center gap-4 p-4 pl-8 font-light shadow-inner pointer-events-auto active:opacity-60 backdrop-blur-xl rounded-xl outline outline-on-bg-light text-on-bg-light hover:outline-on-bg hover:text-on-bg outline-1'
      >
        {$lastCarInView ? 'Värdera din bil' : 'Visa alla'}

        <SCMotionDiv
          animate={hovered ? { x: 3 } : { x: -1 }}
          className={`material-symbols-rounded transition-colors`}
        >
          chevron_right
        </SCMotionDiv>
      </SCMotionAnchor>
    </AnimatePresence>
  );
}
