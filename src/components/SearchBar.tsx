import { useStore } from '@nanostores/react';
import { resultFilters, type ResultFilters } from '../nanoStores/resultStore';
import _ from 'lodash';

export default function SearchBar() {
  const $resultFilters = useStore(resultFilters);

  const setResultFilters = (query: string = '') => {
    resultFilters.set({ ...$resultFilters, query });
  };

  const handleInputChange = _.debounce(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setResultFilters(evt.target.value);
    },
    250
  );

  return (
    <div className='search-bar'>
      <input
        onChange={handleInputChange}
        className='btn'
        placeholder='Sök...'
        type='search'
        name='search-bilar'
      />
      <div id='search-bar-symbol' className='material-symbols-sharp'>
        search
      </div>
    </div>
  );
}
