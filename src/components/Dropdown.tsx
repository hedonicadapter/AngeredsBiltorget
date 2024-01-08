import { useRef, useEffect, type RefObject, useState } from 'react';
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
  handleOnChange,
}: {
  title: string;
  options?: string[];

  disabled?: boolean;
  multiple?: boolean;
  selected?: string | null;
  handleOnChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onInputMount?: (ref: RefObject<HTMLInputElement>) => void;
}) {
  const [dropdownHovered, setDropdownHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    if (!dropdownRef || !dropdownRef.current) return;

    containerRef.current.style.minWidth = `${dropdownRef.current.offsetWidth}px`;
  }, [containerRef, dropdownRef]);

  return (
    <div
      onClick={(evt) => {
        evt.stopPropagation();
        setDropdownHovered(!dropdownHovered);
      }}
      ref={containerRef}
      className={`relative min-h-[calc(var(--golden-ratio)*1.4em)] ${
        disabled
          ? 'pointer-events-none opacity-40'
          : 'pointer-events-auto opacity-100'
      }`}
    >
      <div
        // TODO: funkar ej
        onScroll={(evt) => evt.stopPropagation()}
        ref={dropdownRef}
        className={`btn dropdown ${
          dropdownHovered ? 'dropdown-hovered' : ''
        } absolute top-0 left-0 px-[calc(var(--golden-ratio)*0.3em)] max-h-[calc(var(--golden-ratio)*1.4em)] overflow-hidden flex flex-col gap-4`}
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
                  dropdownTitle={title}
                  handleOnChange={handleOnChange}
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
  dropdownTitle,
  index,
  option,
  onMount,
  handleOnChange,
  checked = false,
}: {
  multiple?: boolean;
  dropdownTitle: string;
  index: number;
  option: string;
  onMount?: (ref: RefObject<HTMLInputElement>) => void;
  handleOnChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange={handleOnChange}
        className='custom-dropdown-checkbox accent-tertiary'
        type={multiple ? 'checkbox' : 'radio'}
        name={multiple ? dropdownTitle : 'singularity'}
        id={`${dropdownTitle}-${index}`}
        value={dropdownTitle}
        checked={checked}
      />
      <label
        onClick={() => inputRef.current?.click()}
        className='flex flex-row items-center justify-between font-light label-and-input'
        htmlFor={dropdownTitle}
      >
        {option}
      </label>
    </SCMotionDiv>
  );
}
