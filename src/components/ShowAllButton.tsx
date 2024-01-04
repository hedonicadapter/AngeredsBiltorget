import { useState } from 'react';
import { SCMotionDiv } from './MotionComponents';

export default function ShowAllButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href='/showroom'
      className='z-40 flex flex-row items-center gap-4 p-4 pl-8 font-light shadow-inner pointer-events-auto active:opacity-60 backdrop-blur-xl rounded-xl outline outline-on-bg-light text-on-bg-light hover:outline-on-bg hover:text-on-bg outline-1'
    >
      Visa alla
      <SCMotionDiv
        animate={hovered ? { x: 3 } : { x: -1 }}
        className={`material-symbols-sharp transition-colors`}
      >
        chevron_right
      </SCMotionDiv>
    </a>
  );
}
