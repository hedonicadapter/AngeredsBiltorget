import { useStore } from '@nanostores/react';
import React, { useEffect, useRef, useState } from 'react';
import { CTAHovered } from '../nanoStores/uiStore';

export default function FakeThreeDeeModel() {
  const $CTAHovered = useStore(CTAHovered);
  const [src, setSrc] = useState('headlights-off.webm');

  useEffect(() => {
    if ($CTAHovered) setSrc('engine-on.webm');
    else setSrc('headlights-off.webm');
  }, [$CTAHovered]);

  const handleEnded = (evt) => {
    // if (!videoRef || !videoRef.current) return;
    // if (src == 'headlights-on.webm') setSrc('engine-on.webm');
    // console.log(evt.target.src);
    // evt.target.currentTime = 0.03;
    // evt.target.pause();
  };

  return (
    <div className='relative'>
      <div
        className={`transition-opacity ${
          src == 'headlights-off.webm' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <video autoPlay muted playsInline loop id='video'>
          <source src='engine-on.webm' type='video/webm' />
        </video>
      </div>
      <div
        className={`absolute top-0 left-0 transition-opacity ${
          src == 'headlights-off.webm' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video autoPlay muted playsInline>
          <source src='headlights-off.webm' type='video/webm' />
        </video>
      </div>
      <video
        autoPlay
        muted
        playsInline
        id='video-shine'
        className='mix-blend-lighten opacity-55 absolute top-0 left-0'
      >
        <source src='shine.webm' type='video/webm' />
      </video>
    </div>
  );
}
