import { useRef, useEffect } from 'react';
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
}: {
  title: string;
  options?: string[];

  // TODO: implement these
  disabled?: boolean;
  multiple?: boolean;
  selected?: string | null;
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
          {options?.map((option: string, index: number) => (
            <div key={option}>
              <OptionItem
                selected={selected}
                option={option}
                index={index}
                filterProperty={filterProperty}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionItem({
  filterProperty,
  index,
  option,
}: {
  filterProperty: keyof typeof filterPropsSwedish;
  index: number;
  option: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const english = filterPropsSwedish[filterProperty];
  const $resultFilters = useStore(resultFilters);

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = evt.target.nextSibling?.textContent;
    const oldValues = $resultFilters[english as keyof ResultFilters];

    const filters = new Set(
      oldValues ? [...oldValues, checkedValue] : [checkedValue]
    );

    if (filters.has(checkedValue) && !evt.target.checked) {
      filters.delete(checkedValue);
    }
    resultFilters.set({ ...$resultFilters, [english]: filters });
  };

  useEffect(() => {
    if (!inputRef || !inputRef.current) return;
    const value = inputRef.current.nextSibling?.textContent;
    const exists = $resultFilters[english as keyof ResultFilters]?.has(value);

    if (!exists) inputRef.current.checked = false;
  }, [$resultFilters, inputRef]);

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
        type='checkbox'
        name={filterProperty}
        id={`${filterProperty}-${index}`}
        // keyof typeof? typescript moment
        value={english?.slice(0, 1).toUpperCase() + english?.slice(1)}
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
