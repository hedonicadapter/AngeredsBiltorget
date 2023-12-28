import React from 'react';
import { useStore } from '@nanostores/react';
import { CTAHovered } from '../nanoStores/CTAStore.js';

export default function CTA() {
  const $CTAHovered = useStore(CTAHovered);

  return (
    <div className='z-40 hover:-translate-y-2 active:opacity-75 active:scale-95 transition-transform relative top-40 flex flex-col justify-center text-center gap-4 shadow-xl'>
      <a
        className='text-2xl w-fit m-auto px-9 pt-4 pb-5 text-on-bg  font-light outline outline-on-bg-medium outline-1 backdrop-blur-xl shadow-inner CTA'
        href='/showroom'
        onMouseEnter={() => CTAHovered.set(true)}
        onMouseLeave={() => CTAHovered.set(false)}
      >
        Se vårt showroom
        {/* <!-- Cut-out text effect -->
          <!-- <svg className="knockout-text-container" width=100%" height="55">
            
            <rect class="fill-surface" width="94%" height="55" x="3%" y="0" fill-opacity="1" mask="url(#knockout-text)" />
            
            <mask id="knockout-text">
              <rect width="94%" height="80" fill="#fff" x="3%" y="0" />
              <text x="50%" y="64%" fill="#000" text-anchor="middle">Se vårt showroom</text>
            </mask>
            
          </svg> --> */}
      </a>
    </div>
  );
}
