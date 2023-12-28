// import React from 'react'
import { useStore } from '@nanostores/react';
import { resultFilters } from '../nanoStores/resultStore';
import Tag from './Tag';

export default function TagsContainer() {
  const $resultFilters = useStore(resultFilters);

  return (
    <div className='tags-container flex flex-row'>
      {Object.entries($resultFilters)?.map(
        ([key, values], i) =>
          key != 'query' &&
          [...values].map((value: string) => (
            <div key={`${value}-${i}`}>
              <Tag text={value} />
            </div>
          ))
      )}
    </div>
  );
}
