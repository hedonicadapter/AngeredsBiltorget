import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { CTAHovered } from '../nanoStores/uiStore';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SCMotionDiv } from './MotionComponents';

const headlightsOn =
  'https://csb10032002dd958075.blob.core.windows.net/model/headlights-on.webm';
const headlightsOff =
  'https://csb10032002dd958075.blob.core.windows.net/model/headlights-off.webm';
const engineOn =
  'https://csb10032002dd958075.blob.core.windows.net/model/engine-on.webm';
const shine =
  'https://csb10032002dd958075.blob.core.windows.net/model/shine.webm';

export default function FakeThreeDeeModel() {
  const { scrollYProgress, scrollY } = useScroll();
  const smoothX = useSpring(scrollY, { damping: 100, stiffness: 1000 });
  const x = useTransform(smoothX, (y) => -y);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const $CTAHovered = useStore(CTAHovered);
  const [src, setSrc] = useState(headlightsOff);

  useEffect(() => {
    if ($CTAHovered) setSrc(engineOn);
    else setSrc(headlightsOff);
  }, [$CTAHovered]);

  return (
    <SCMotionDiv
      style={{ x, opacity }}
      className='relative my-auto flex flex-col justify-center items-center h-min'
    >
      <div
        className={`flex justify-center items-center flex-shrink-0 fake-model-size overflow-hidden
          transition-opacity ${
            src == headlightsOff ? 'opacity-0' : 'opacity-100'
          }
        `}
      >
        <video autoPlay muted playsInline loop id='video'>
          <source src={engineOn} type='video/webm' />
        </video>
      </div>
      <div
        className={`flex justify-center items-center flex-shrink-0 overflow-hidden absolute top-0 left-0 right-0 bottom-0 transition-opacity ${
          src == headlightsOff ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video autoPlay muted playsInline>
          <source src={headlightsOff} type='video/webm' />
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
          <source src={shine} type='video/webm' />
        </video>
      </div>
    </SCMotionDiv>
  );
}
