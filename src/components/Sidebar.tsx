import { useState, type ReactElement } from 'react';

export default function Sidebar({ anchors }: { anchors: ReactElement }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='lg:hidden relative'>
      <button
        onClick={() => setOpen(!open)}
        id='borger'
        className='absolute right-[calc(var(--golden-ratio)*2em)] top-[calc((var(--golden-ratio)*1.5em))] z-[101] flex flex-row items-center'
      >
        <div id='borger-icon' className='material-symbols-sharp'>
          menu
        </div>
      </button>

      <div
        className={`z-[18] transition-[right0.25sease-out] absolute top-0 bg-surface w-[33vw] h-screen p-4 pt-36 
        ${open ? 'right-0' : '-right-[100vw]'}
        `}
      >
        {anchors}
      </div>
    </div>
  );
}

// TODO: fix z-index inconsistencies
