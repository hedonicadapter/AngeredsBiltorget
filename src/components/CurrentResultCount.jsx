import React from 'react';
import { currentResultCount } from '../nanoStores/resultStore';
import { useStore } from '@nanostores/react';

export default function CurrentResultCount() {
  const $currentResultCount = useStore(currentResultCount);

  return <span id='results-showing'>{$currentResultCount}</span>;
}
