import { useEffect, useState } from 'react';

export default (
  callback: (evt: Event, direction: { x: string; y: string }) => void
) => {
  const [oldScrollY, setOldScrollY] = useState(0);
  const [oldScrollX, setOldScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = (evt: Event) => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const direction = {
        x: scrollX > oldScrollX ? 'right' : 'left',
        y: scrollY > oldScrollY ? 'down' : 'up',
      };

      callback(evt, direction);

      setOldScrollY(scrollY);
      setOldScrollX(scrollX);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
};
