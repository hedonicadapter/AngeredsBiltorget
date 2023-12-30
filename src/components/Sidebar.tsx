import { useStore } from '@nanostores/react';
import React from 'react';
import { sidebarOpen } from '../nanoStores/uiStore';

export default function Sidebar({ anchors }: { anchors?: any }) {
  const $sidebarOpen = useStore(sidebarOpen);

  return (
    <div className='z-[100]'>
      <div
        onClick={() => $sidebarOpen && sidebarOpen.set(false)}
        className={`w-screen h-screen fixed z-[98] transition-[backdrop-filter0.5sease-in] ${
          $sidebarOpen
            ? 'pointer-events-auto bg-bg-transparent backdrop-blur-md'
            : 'pointer-events-none bg-[#00000000]'
        }`}
      >
        <div
          onClick={(evt) => evt.stopPropagation()}
          className={`absolute transition-[right0.25sease-out] absolute top-0 bg-surface w-[33vw] h-screen p-4 pt-44 
        ${$sidebarOpen ? 'right-0' : '-right-[100vw]'}
        `}
        >
          {anchors}
        </div>
      </div>
    </div>
  );
}
