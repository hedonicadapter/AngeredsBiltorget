import { useStore } from '@nanostores/react';
import { sidebarOpen } from '../nanoStores/uiStore';

export default function Sidebar({ anchors }: { anchors?: any }) {
  const $sidebarOpen = useStore(sidebarOpen);
  // const $sidebarOpen = true;

  return (
    <div
      className={`fixed w-[133vw] h-screen flex flex-row transition-all ${
        $sidebarOpen
          ? 'z-[2000] right-0 pointer-events-auto'
          : 'z-auto -right-[33vw] pointer-events-none'
      }`}
    >
      <div
        onClick={() => $sidebarOpen && sidebarOpen.set(false)}
        className={`w-screen h-screen pointer-events-auto ${
          $sidebarOpen
            ? 'pointer-events-auto bg-bg-transparent backdrop-blur-md'
            : 'pointer-events-none bg-[#00000000]'
        }`}
      ></div>
      <div
        className={` transition-[right0.25sease-out] top-0 -right-[33vw] bg-surface w-[33vw] h-screen p-4 pt-44 
        ${$sidebarOpen ? ' pointer-events-auto' : ' pointer-events-none'}
        `}
      >
        {anchors}
      </div>
    </div>
  );
}
