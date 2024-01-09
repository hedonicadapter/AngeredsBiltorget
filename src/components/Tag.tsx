import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { resultFilters } from '../nanoStores/resultStore';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [closedWidth, setClosedWidth] = useState<number>(0);
  const [expandedWidth, setExpandedWidth] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const $resultFilters = useStore(resultFilters);

  const removeTag = () => {
    tagRef.current?.classList.add('invisible');
    setTimeout(() => {
      tagRef.current?.remove();
    }, 300);

    for (const [key, values] of Object.entries($resultFilters)) {
      if (key != 'query') {
        if (values.has(text)) {
          values.delete(text);
          resultFilters.set({ ...$resultFilters });
        }
      }
    }
  };

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    if (!tagRef || !tagRef.current) return;
    if (!crossRef || !crossRef.current) return;
    if (!textRef || !textRef.current) return;

    const containerStyle = window.getComputedStyle(containerRef.current);
    const textStyle = window.getComputedStyle(textRef.current);
    const crossStyle = window.getComputedStyle(crossRef.current);

    const containerPaddingLeft = parseFloat(containerStyle.paddingLeft);
    const textPaddingLeft = parseFloat(textStyle.paddingLeft);
    const textPaddingRight = parseFloat(textStyle.paddingRight);
    const crossPaddingLeft = parseFloat(crossStyle.paddingLeft);
    const crossPaddingRight = parseFloat(crossStyle.paddingRight);

    setExpandedWidth(
      containerRef.current.offsetWidth +
        textRef.current.offsetWidth +
        crossRef.current.offsetWidth +
        textPaddingLeft +
        textPaddingRight +
        crossPaddingLeft +
        crossPaddingRight
    );
    setClosedWidth(textRef.current.offsetWidth + containerPaddingLeft);
  }, [containerRef, tagRef, crossRef, textRef]);

  useEffect(() => {
    if (width == 0) setWidth(closedWidth);
  }, [closedWidth, width]);

  return (
    <div
      onFocus={() => setWidth(expandedWidth)}
      onMouseEnter={() => setWidth(expandedWidth)}
      onBlur={() => setWidth(closedWidth)}
      onMouseLeave={() => setWidth(closedWidth)}
      style={{ maxWidth: width }}
      ref={containerRef}
      onClick={removeTag}
      className='tag-container'
    >
      <div
        ref={tagRef}
        className='flex flex-row items-center justify-between btn tag'
      >
        <div ref={textRef} className='tag-text'>
          {text}
        </div>
        <div ref={crossRef} className='material-symbols-rounded tag-cross'>
          close_small
        </div>
      </div>
    </div>
  );
};

export default Tag;
