import { useStore } from '@nanostores/react';
import { filterContainerExpanded } from '../nanoStores/uiStore';

import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import {
  filterPropsSwedish,
  resultFilters,
  type ResultFilters,
} from '../nanoStores/resultStore';

export default function ButtonsContainer(props: { child?: any }) {
  // TODO: expand container when this is true
  // const $filterContainerExpanded = useStore(filterContainerExpanded);

  const $resultFilters = useStore(resultFilters);

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = evt.target.nextSibling?.textContent;
    const english =
      filterPropsSwedish[
        evt.target.name.toLowerCase() as keyof typeof filterPropsSwedish
      ];
    const oldValues = $resultFilters[english as keyof ResultFilters];

    const filters = new Set(
      oldValues ? [...oldValues, checkedValue] : [checkedValue]
    );

    if (filters.has(checkedValue) && !evt.target.checked) {
      filters.delete(checkedValue);
    }
    resultFilters.set({ ...$resultFilters, [english]: filters });
  };

  const onInputMount = (ref) => {
    const checkedValue = ref.current.nextSibling?.textContent;
    const english =
      filterPropsSwedish[
        ref.current.name.toLowerCase() as keyof typeof filterPropsSwedish
      ];

    const exists =
      $resultFilters[english as keyof ResultFilters]?.has(checkedValue);

    if (!exists) ref.current.checked = false;
  };

  return (
    <div
      slot='child'
      className='z-50 flex flex-row flex-wrap items-center justify-start p-4 bg-surface-dark rounded-2xl md:justify-between'
    >
      <Dropdown
        title='Årsmodell'
        options={['2019', '2020', '2021', '2022']}
        handleCheckboxChange={handleCheckboxChange}
        onInputMount={onInputMount}
      ></Dropdown>
      <Dropdown
        title='Märke'
        options={['Volvo', 'Saab', 'Mercedes', 'Audi']}
        handleCheckboxChange={handleCheckboxChange}
        onInputMount={onInputMount}
      ></Dropdown>
      <SearchBar />
    </div>
  );
}
