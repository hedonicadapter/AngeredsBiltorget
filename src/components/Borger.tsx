import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { sidebarOpen } from '../nanoStores/uiStore';

export default function Borger(props: { anchors?: any }) {
  const $sidebarOpen = useStore(sidebarOpen);

  return (
    <div className='lg:hidden absolute flex flex-row z-[1001] right-0'>
      <button
        onClick={() => sidebarOpen.set(!$sidebarOpen)}
        id='borger'
        className='flex items-center z-[1001]'
      >
        {/* TODO: fix z-index */}
        <div id='borger-icon' className='inline material-symbols-rounded'>
          more_vert
        </div>
      </button>
    </div>
  );
}

// TODO: fix z-index inconsistencies
