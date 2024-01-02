import React from 'react';
import { useStore } from '@nanostores/react';
import { CTAHovered } from '../nanoStores/uiStore.ts';

export default function CTA() {
  const $CTAHovered = useStore(CTAHovered);

  return (
    <div className='z-50 hover:-translate-y-2 active:opacity-75 active:scale-95 transition-transform relative top-[22vh] flex flex-col justify-center text-center gap-4 shadow-xl'>
      <a
        className='pt-4 pb-5 m-auto text-2xl font-light shadow-inner w-fit px-9 text-on-bg outline outline-on-bg-medium outline-1 backdrop-blur-md rounded-xl CTA'
        href='/showroom'
        onFocus={() => CTAHovered.set(true)}
        onMouseEnter={() => CTAHovered.set(true)}
        onBlur={() => CTAHovered.set(false)}
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
