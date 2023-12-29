import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

import { getProducts, getProductFiles } from '../api.ts';
import Card from './Card.jsx';
import { useStore } from '@nanostores/react';
import { resultFilters } from '../nanoStores/resultStore.ts';

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

  const getCars = async (filter) => {
    if (gettingProducts) return;
    setGettingProducts(true);

    const carDocs = await getProducts(page, 16, 'year', filter);

    const carsFromDB = await Promise.all(
      carDocs.map(async (doc) => {
        setPage(doc);
        const fileUrls = await getProductFiles(doc.id);

        const car = doc.data();

        car.src = fileUrls.find((file) =>
          file.name.startsWith('thumbnail')
        )?.url;
        car.id = doc.id;

        // TODO: delete after labbinlämning
        car.quantity = 1;

        // setRepeatingIndex(repeatingIndex + 1);
        // setIndex(index + 1);
        return car;
      })
    );

    setGettingProducts(false);

    const newCars = [...cars, ...carsFromDB];
    setCars(newCars);
  };

  const handleCarsContainerScroll = _.debounce((evt) => {
    const scrolledToTop = window.scrollY == 0;
    const scrolledToBottom =
      evt.target.scrollTop ===
      evt.target.scrollHeight - evt.target.offsetHeight;
    const direction = window.scrollY > oldScrollY.current ? 'down' : 'up';

    if (scrolledToBottom) {
      getCars();
    }

    // TODO: what was I cooking?
    // if (direction === 'up' && scrolledToTop) {
    //   evt.target.scrollTo();
    //   window.scrollTo({ top: document.body.scrollHeight });
    // }

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
      className='cars-container flex sm:flex-row items-center justify-evenly overflow-x-visible overflow-y-auto flex-wrap'
    >
      {cars &&
        cars.length > 0 &&
        cars.map((car, index) => (
          <div key={car.id} id={`car-${car.id}`}>
            <Card
              index={index}
              id={car?.id}
              title={car?.title}
              make={car?.make}
              model={car?.model}
              price={car?.price}
              src={car?.src}
              quantity={car?.quantity}
            />
          </div>
        ))}
    </div>
  );
}
