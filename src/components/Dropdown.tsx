import { useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  resultFilters,
  type ResultFilters,
  filterPropsSwedish,
} from '../nanoStores/resultStore';

export default function Dropdown({
  title,
  options,
}: {
  title: string;
  options?: string[];
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
      ref={containerRef}
      className='relative min-h-[calc(var(--golden-ratio)*1.4em)] z-[100]'
    >
      <div
        // TODO: funkar ej
        onScroll={(evt) => evt.stopPropagation()}
        ref={dropdownRef}
        className='btn dropdown absolute top-0 left-0 px-[calc(var(--golden-ratio)*0.3em)] max-h-[calc(var(--golden-ratio)*1.4em)] overflow-hidden flex flex-col gap-3'
      >
        <div className='sticky top-0 bg-bg'>{title}</div>
        <div className='overflow-y-auto h-min-content'>
          {options?.map((option: string, index: number) => (
            <div key={option} className='drop-down-input-label-container'>
              <Checkbox index={index} filterProperty={filterProperty} />
              <label
                className='label-and-input flex flex-row items-center justify-between'
                htmlFor={filterProperty}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checkbox({
  filterProperty,
  index,
}: {
  filterProperty: keyof typeof filterPropsSwedish;
  index: number;
}) {
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

  return (
    <input
      onChange={handleCheckboxChange}
      className='custom-dropdown-checkbox'
      type='checkbox'
      name={filterProperty}
      id={`${filterProperty}-${index}`}
      // keyof typeof? typescript moment
      value={english?.slice(0, 1).toUpperCase() + english?.slice(1)}
    />
  );
}
