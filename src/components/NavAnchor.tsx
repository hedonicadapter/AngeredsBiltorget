import { useStore } from '@nanostores/react';
import React, { useEffect, useRef, useState } from 'react';
import { cart } from '../nanoStores/productStore';
import { sidebarOpen } from '../nanoStores/uiStore';
import { navigate } from 'astro:transitions/client';

type NavAnchorProps = {
  anchorText: string;
  anchorHref: string;
  closeOnClick?: boolean;
};

const NavAnchor: React.FC<NavAnchorProps> = ({
  anchorText,
  anchorHref,
  closeOnClick,
}) => {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const $cart = useStore(cart);

  useEffect(() => {
    closeOnClick;
    const anchor = anchorRef.current;

    if (!anchor) return;

    const handleMouseOver = (evt: MouseEvent) => {
      const targetElement = evt.target as HTMLAnchorElement;

      const hoverEvent = new CustomEvent('nav-anchor-mouseover', {
        detail: {
          left: targetElement.offsetLeft,
          top: targetElement.offsetTop,
          width: targetElement.offsetWidth,
          paddingInline:
            parseFloat(getComputedStyle(anchor).paddingLeft) +
            parseFloat(getComputedStyle(anchor).paddingRight),
        },
      });

      document.dispatchEvent(hoverEvent);
    };

    anchor.addEventListener('mouseover', handleMouseOver);

    return () => {
      anchor.removeEventListener('mouseover', handleMouseOver);
    };
  }, [anchorRef]);

  useEffect(() => {
    if ($cart) setBadgeVisible(true);
    else setBadgeVisible(false);
  }, [$cart]);

  // TODO: delete after labbinlämning
  return (
    <div className='z-50'>
      <a
        // For recording the model
        // onMouseEnter={() => {
        //   const event = new CustomEvent('rec');
        //   window.dispatchEvent(event);
        // }}
        // onMouseLeave={() => {
        //   const event = new CustomEvent('stopRec');
        //   window.dispatchEvent(event);
        // }}
        ref={anchorRef}
        // href={anchorHref}
        onClick={() => {
          navigate(anchorHref, { history: 'auto' });
          sidebarOpen.set(false);
        }}
        className='nav-anchor material-symbols-sharp'
      >
        {anchorText}
        {anchorHref === 'cart' && (
          <div
            className={`cart-badge transition-opacity ${
              badgeVisible ? 'visible' : 'invisible'
            }`}
          ></div>
        )}
      </a>
    </div>
  );
};

export default NavAnchor;
