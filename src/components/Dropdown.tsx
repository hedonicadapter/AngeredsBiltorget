import { useRef, useEffect, type RefObject } from 'react';
import { useStore } from '@nanostores/react';
import {
  resultFilters,
  type ResultFilters,
  filterPropsSwedish,
} from '../nanoStores/resultStore';
import { filterContainerExpanded } from '../nanoStores/uiStore';
import { SCMotionDiv } from './MotionComponents';

// TODO: hovering past a certain point closes the dropdown...
export default function Dropdown({
  title,
  options,
  disabled = false,
  multiple = false,
  selected = null,
  onInputMount,
  handleCheckboxChange,
}: {
  title: string;
  options?: string[];

  // TODO: implement these
  disabled?: boolean;
  multiple?: boolean;
  selected?: string | null;
  handleCheckboxChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onInputMount?: (ref: RefObject<HTMLInputElement>) => void;
}) {
  const filterProperty = title.toLowerCase() as keyof typeof filterPropsSwedish;

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    if (!dropdownRef || !dropdownRef.current) return;

    containerRef.current.style.minWidth = `${dropdownRef.current.offsetWidth}px`;
  }, [containerRef, dropdownRef]);

  return (
    <div
      onFocus={() => filterContainerExpanded.set(true)}
      onMouseEnter={() => filterContainerExpanded.set(true)}
      onBlur={() => filterContainerExpanded.set(false)}
      onMouseLeave={() => filterContainerExpanded.set(false)}
      ref={containerRef}
      className={`relative min-h-[calc(var(--golden-ratio)*1.4em)] z-[100] ${
        disabled
          ? 'pointer-events-none opacity-40'
          : 'pointer-events-auto opacity-100'
      }`}
    >
      <div
        // TODO: funkar ej
        onScroll={(evt) => evt.stopPropagation()}
        ref={dropdownRef}
        className=' btn dropdown absolute top-0 left-0 px-[calc(var(--golden-ratio)*0.3em)] max-h-[calc(var(--golden-ratio)*1.4em)] overflow-hidden flex flex-col gap-4'
      >
        <div className='sticky top-[0.6px]  font-light'>
          {disabled && selected ? selected : title}
        </div>
        <div className='overflow-y-auto h-min-content rounded-xl'>
          {options?.map((option: string, index: number) => {
            return (
              <div key={option}>
                <OptionItem
                  multiple={multiple}
                  checked={selected == option}
                  option={option}
                  index={index}
                  filterProperty={filterProperty}
                  handleCheckboxChange={handleCheckboxChange}
                  onMount={onInputMount}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OptionItem({
  multiple,
  filterProperty,
  index,
  option,
  onMount,
  handleCheckboxChange,
  checked = false,
}: {
  multiple?: boolean;
  filterProperty: keyof typeof filterPropsSwedish;
  index: number;
  option: string;
  onMount?: (ref: RefObject<HTMLInputElement>) => void;
  handleCheckboxChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const english =
    filterPropsSwedish[
      filterProperty.toLowerCase() as keyof typeof filterPropsSwedish
    ];

  useEffect(() => {
    if (!inputRef || !inputRef.current) return;
    if (onMount) onMount(inputRef);
  }, [inputRef]);

  return (
    <SCMotionDiv
      whileTap={{ scale: 0.99, opacity: 0.4 }}
      transition={{ duration: 0.1, easing: 'easeOut' }}
      className='drop-down-input-label-container'
    >
      <input
        ref={inputRef}
        onChange={handleCheckboxChange}
        className='custom-dropdown-checkbox accent-tertiary'
        type={multiple ? 'checkbox' : 'radio'}
        name={multiple ? filterProperty : 'idk'}
        id={`${filterProperty}-${index}`}
        // keyof typeof? typescript moment
        value={english?.slice(0, 1).toUpperCase() + english?.slice(1)}
        checked={checked}
      />
      <label
        onClick={() => inputRef.current?.click()}
        className='flex flex-row items-center justify-between font-light label-and-input'
        htmlFor={filterProperty}
      >
        {option}
      </label>
    </SCMotionDiv>
  );
}
