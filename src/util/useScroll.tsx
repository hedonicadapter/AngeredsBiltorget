import { useEffect } from 'react';

export default (callback: (evt: Event) => void) => {
  useEffect(() => {
    const handleScroll = (evt: Event) => {
      callback(evt);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
};
