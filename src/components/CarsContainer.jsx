import { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash-es';

import { getProducts, getProductFiles } from '../api.ts';
import { CarCard } from './Cards.jsx';
import { useStore } from '@nanostores/react';
import { resultFilters } from '../nanoStores/resultStore.ts';
import { LoadingSpinner } from './spinners.tsx';

export default function CarsContainer() {
  const oldScrollY = useRef(0);
  const [cars, setCars] = useState([]);
  const [gettingProducts, setGettingProducts] = useState(false); // Prevents multiple requests from being sent at once
  const [page, setPage] = useState(0);
  const $resultFilters = useStore(resultFilters);
  //   const [index, setIndex] = useState(0);
  //   const [repeatingIndex, _setRepeatingIndex] = useState(0);

  //   const setRepeatingIndex = (index) => {
  //     if (index > 16) {
  //       return _setRepeatingIndex(0);
  //     }
  //     _setRepeatingIndex(index);
  //   };

  //   const fadeCarIn = (index, elementId) => {
  //     setTimeout(() => {
  //       const car = document.querySelector(`#car-${elementId}`);
  //       if (!car) return;

  //       car.style.opacity = 1;
  //       car.style.pointerEvents = 'all';
  //     }, index * 50);
  //   };

  //   useEffect(() => {
  //     if (!cars[index]) return;
  //     console.log(index);
  //     console.log(cars[index]);
  //     fadeCarIn(repeatingIndex, cars[index].id);
  //   }, [index, cars]);

  // // This shouldn't be here but idk what else to do
  // // TODO: broken, tween instead?
  // setTimeout(() => {
  //   currentResultCount.set($currentResultCount + 1);
  // }, (index / 16) * 50);

  // TODO: this is being set after cars have been fetched instead of before, making the spinner not show up
  // useEffect(() => {
  //   console.log('getting products');
  // }, [gettingProducts]);

  const getCars = useCallback(
    async (filter) => {
      if (gettingProducts) return;
      setGettingProducts(true);

      const carDocs = await getProducts(page, 16, 'year', filter);

      const carsFromDB = await Promise.all(
        carDocs.map(async (doc, i) => {
          setPage(doc);
          const fileUrls = await getProductFiles(doc.id);

          const car = doc.data();

          car.src = fileUrls.find((file) =>
            file.name.startsWith('thumbnail')
          )?.url;
          car.id = doc.id;

          // TODO: delete
          car.quantity = 1;

          return car;
        })
      );

      setGettingProducts(false);

      const newCars = [...cars, ...carsFromDB];
      setCars(newCars);
    },
    [gettingProducts, page, cars]
  );

  const handleCarsContainerScroll = _.debounce((evt) => {
    const scrolledToBottom =
      evt.target.scrollTop ===
      evt.target.scrollHeight - evt.target.offsetHeight;

    if (scrolledToBottom) {
      getCars();
    }

    oldScrollY.current = window.scrollY;
  }, 150);

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    getCars($resultFilters);
  }, [$resultFilters]);

  return (
    <div
      onScroll={handleCarsContainerScroll}
      className='cars-container relative pb-96 flex flex-row items-start justify-evenly overflow-x-visible overflow-y-auto px-[1px] flex-wrap gap-6 mt-10'
    >
      {cars &&
        cars.length > 0 &&
        cars.map((car, index) => (
          <div
            className='card-container flex-grow w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]'
            key={car.id}
            id={`car-${car.id}`}
          >
            <CarCard index={index} interactive {...car} />
          </div>
        ))}
      {/* TODO: broken, gettingProducts is set to true right after they've been fetched */}
      <div className='fixed left-0 right-0 z-50 w-full h-24 bottom-16 '>
        {gettingProducts ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
}
