import { useStore } from '@nanostores/react';
import { filterContainerExpanded } from '../nanoStores/uiStore';

import Dropdown from './Dropdown';
import SearchBar from './SearchBar';

export default function ButtonsContainer(props: { child?: any }) {
  // TODO: expand container when this is true
  const $filterContainerExpanded = useStore(filterContainerExpanded);

  return (
    <div
      slot='child'
      className='bg-[var(--bg-transparent)] rounded-2xl outline outline-outline outline-1 p-4 flex flex-row flex-wrap items-center justify-start md:justify-between z-50'
    >
      <Dropdown
        title='Årsmodell'
        options={['2019', '2020', '2021', '2022']}
      ></Dropdown>
      <Dropdown
        title='Märke'
        options={['Volvo', 'Saab', 'Mercedes', 'Audi']}
      ></Dropdown>
      <SearchBar />
    </div>
  );
}
