import { useStore } from '@nanostores/react';
import React, { useEffect, useRef, useState } from 'react';
import { cart } from '../nanoStores/productStore';

type NavAnchorProps = {
  anchorText: string;
  anchorHref: string;
};

const NavAnchor: React.FC<NavAnchorProps> = ({ anchorText, anchorHref }) => {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const $cart = useStore(cart);

  useEffect(() => {
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
  return anchorHref === 'cart' ? (
    <a
      ref={anchorRef}
      href={anchorHref}
      className='nav-anchor material-symbols-sharp'
    >
      <span className='material-symbols-sharp'>shopping_cart</span>
      <div
        className={`cart-badge transition-opacity ${
          badgeVisible ? 'visible' : 'invisible'
        }`}
      ></div>
    </a>
  ) : (
    <a
      ref={anchorRef}
      href={anchorHref}
      className='nav-anchor material-symbols-sharp'
    >
      {anchorText}
    </a>
  );
};

export default NavAnchor;
