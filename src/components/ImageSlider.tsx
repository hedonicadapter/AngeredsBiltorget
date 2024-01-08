import { useEffect, useState } from 'react';
import type Car from '../Models/Car';
import { SCMotionDiv } from './MotionComponents';

export default function ImageSlider(props: { files: any; product: Car }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const imageSelectionEvent = new CustomEvent('image-selection', {
      detail: { src: props.files[selected].url },
    });
    document.dispatchEvent(imageSelectionEvent);
  }, [selected]);

  return props.files?.map((file: any, index: number) => (
    <SCMotionDiv
      whileTap={{ opacity: 0.4, scale: 0.99 }}
      transition={{ easing: 'easeOut', duration: 0.15 }}
      className={`z-50 w-auto h-full rounded-sm aspect-video outline outline-3 ${
        selected == index ? 'outline-outline' : ' outline-transparent'
      }`}
      key={index}
      onClick={() => setSelected(index)}
    >
      <img
        className='object-cover w-full h-full rounded-sm'
        src={file.url}
        alt={`${
          props.product.title || props.product.make + ' ' + props.product.model
        } (car)`}
      />
    </SCMotionDiv>
  ));
}
