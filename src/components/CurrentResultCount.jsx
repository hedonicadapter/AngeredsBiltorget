import { useEffect, useRef, useState } from 'react';
import { currentResultCount } from '../nanoStores/resultStore.ts';
import { useStore } from '@nanostores/react';
import { animate } from 'framer-motion';

// https://stackoverflow.com/a/60523470
function Counter({ to }) {
  const [from, setFrom] = useState(0);
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = Math.round(value.toFixed(2));
      },
    });

    return () => {
      controls.stop();
      setFrom(to);
    };
  }, [to]);

  return <span ref={nodeRef} />;
}

export default function CurrentResultCount() {
  const $currentResultCount = useStore(currentResultCount);

  return (
    <span id='results-showing'>
      <Counter to={$currentResultCount} />
    </span>
  );
}
