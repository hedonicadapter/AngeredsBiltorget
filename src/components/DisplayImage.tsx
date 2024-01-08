import React, { useEffect, useRef } from 'react';

export default function DisplayImage({
  product,
  mainImage,
}: {
  product?: any;
  mainImage?: any;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef || !imgRef.current) return;

    const onImageSelection = (evt: any) => {
      if (!imgRef || !imgRef.current) return;

      const { src } = evt.detail;
      imgRef.current.src = src;
    };

    document.addEventListener('image-selection', onImageSelection);

    return () =>
      document.removeEventListener('image-selection', onImageSelection);
  }, [imgRef]);

  return (
    <img
      ref={imgRef}
      className='md:fixed aspect-square md:top-0 md:left-0 md:bottom-0 md:right-0 object-cover w-[70vw] mx-auto h-auto md:w-[50vh] md:h-[50vh] md:m-auto overflow-visible md:z-[-20]'
      style={{ viewTransitionName: `thumbnail-${product.id}` }}
      src={mainImage?.url || '/images/volvo.webp'}
      alt={`${product.title || product.make + ' ' + product.model} (car)`}
    />
  );
}
