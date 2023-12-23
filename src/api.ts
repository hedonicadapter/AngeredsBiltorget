import { db } from './db';
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  DocumentSnapshot,
  DocumentData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';
import Car from './Models/Car';

export async function getProducts(
  start: number | DocumentSnapshot,
  perPage: number = 16,
  order: string = 'year'
): Promise<DocumentSnapshot<DocumentData, DocumentData>[]> {
  const q = query(
    collection(db, 'products'),
    orderBy(order),
    startAfter(start),
    limit(perPage)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs;
}

export async function getProductById(id: string): Promise<Car> {
  const productRef = doc(db, 'products', id);
  const productDoc = await getDoc(productRef);

  if (productDoc.exists()) {
    return productDoc.data() as Car;
  } else {
    throw new Error('Product not found');
  }
}

export async function upsertProduct(product: Car) {
  if (product.id) {
    const productRef = doc(db, 'products', product.id);
    await updateDoc(productRef, product);
  } else {
    await addDoc(collection(db, 'products'), product);
  }
}

export async function deleteProduct(id: string) {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
}

// for (let i = 0; i < 96; i++) {
//   const car: Car = generateDummyCarData();

//   await upsertProduct(car);
// }
const carMakes = ['Volvo', 'Saab', 'Volkswagen', 'Audi', 'BMW'];
const carModels = ['S60', '9-3', 'Golf', 'A4', '3 Series'];
const gearboxOptions = ['Manuell', 'Automat'];
const fuelTypeOptions = ['Bensin', 'Diesel', 'El'];
const vehicleTypeOptions = ['Sedan', 'Kombi', 'SUV'];
const colors = ['Vit', 'Svart', 'Blå', 'Röd', 'Grön'];
export const generateDummyCarData = () => {
  const getRandomElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandomArray = (array, maxCount) => {
    const count = generateRandomNumber(0, maxCount);
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(getRandomElement(array));
    }
    return result;
  };

  const dummyCar = {
    title: 'Dummy Car',
    price: generateRandomNumber(50000, 1500000),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    make: getRandomElement(carMakes),
    model: getRandomElement(carModels),
    year: generateRandomNumber(2010, 2023),
    mileage: generateRandomNumber(0, 200000),
    registrationNumber: `${generateRandomNumber(100, 999)}ABC`,
    gearbox: getRandomElement(gearboxOptions),
    fuelType: getRandomElement(fuelTypeOptions),
    vehicleType: getRandomElement(vehicleTypeOptions),
    color: getRandomElement(colors),
    extraFeatures: generateRandomArray(
      ['GPS', 'Bluetooth', 'Sunroof', 'Leather Seats'],
      3
    ),
  };

  return dummyCar;
};
