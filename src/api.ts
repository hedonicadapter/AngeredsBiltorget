import { db, storage } from './db';
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
  getCountFromServer,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getMetadata,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';

import Car from './Models/Car';

const productCollection = collection(db, 'products');

export async function getProductCount() {
  const snapshot = await getCountFromServer(productCollection);
  return snapshot.data().count;
}

export async function getProducts(
  start: number | DocumentSnapshot,
  perPage: number = 16,
  order: string = 'year'
): Promise<DocumentSnapshot<DocumentData, DocumentData>[]> {
  const q = query(
    productCollection,
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
    await addDoc(productCollection, product);
  }
}

export async function deleteProduct(id: string) {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
}

export async function removeImageBackground(imageFile: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('image_file', imageFile);

  const response = await fetch('https://sdk.photoroom.com/v1/segment', {
    method: 'POST',
    headers: {
      'X-Api-Key': import.meta.env.VITE_PHOTOROOM_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    console.error(response.json());
    throw new Error('Network response was not ok');
  }

  const imageBlob: Blob = await response.blob();

  return imageBlob;
}

export async function postProductImage(
  id: string,
  file: File,
  overwrite: boolean = true
) {
  const storage = getStorage();
  let storageRef = ref(storage, `products/${id}/${file.name}`);

  if (!overwrite) {
    try {
      await getMetadata(storageRef);
    } catch (err) {
      storageRef = ref(storage, `products/${id}/${file.name} (duplicate)`);
    }
  }

  //   TODO: error handling
  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
}

export async function getProductFiles(id: string) {
  const storage = getStorage();
  let storageRef = ref(storage, `products/${id}`);

  const res = await listAll(storageRef);

  const fileURLs = await Promise.all(
    res.items.map(async (item: StorageReference) => {
      const fileUrl = await getDownloadURL(item);

      return { name: item.name, url: fileUrl };
    })
  );
  return fileURLs;
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
