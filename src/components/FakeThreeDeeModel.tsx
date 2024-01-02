import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { CTAHovered } from '../nanoStores/uiStore';

export default function FakeThreeDeeModel() {
  const $CTAHovered = useStore(CTAHovered);
  const [src, setSrc] = useState('headlights-off.webm');

  useEffect(() => {
    if ($CTAHovered) setSrc('engine-on.webm');
    else setSrc('headlights-off.webm');
  }, [$CTAHovered]);

  return (
    <div className='relative my-auto flex flex-col justify-center items-center h-min'>
      <div
        className={`flex justify-center items-center flex-shrink-0 fake-model-size overflow-hidden
          transition-opacity ${
            src == 'headlights-off.webm' ? 'opacity-0' : 'opacity-100'
          }
        `}
      >
        <video autoPlay muted playsInline loop id='video'>
          <source src='engine-on.webm' type='video/webm' />
        </video>
      </div>
      <div
        className={`flex justify-center items-center flex-shrink-0 overflow-hidden absolute top-0 left-0 right-0 bottom-0 transition-opacity ${
          src == 'headlights-off.webm' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video autoPlay muted playsInline>
          <source src='headlights-off.webm' type='video/webm' />
        </video>
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-shrink-0 fake-model-size overflow-hidden'>
        <video
          autoPlay
          muted
          playsInline
          id='video-shine'
          className='mix-blend-lighten opacity-55  '
        >
          <source src='shine.webm' type='video/webm' />
        </video>
      </div>
    </div>
  );
}
