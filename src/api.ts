import { db } from './firebase/client';
import {
  collection,
  query,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  startAfter,
  limit,
  getCountFromServer,
} from 'firebase/firestore';
import type { DocumentSnapshot, DocumentData } from 'firebase/firestore';

import {
  getStorage,
  ref,
  getMetadata,
  uploadBytes,
  listAll,
  getDownloadURL,
} from 'firebase/storage';
import type { StorageReference } from 'firebase/storage';

import type Car from './Models/Car';
import type { ResultFilters } from './nanoStores/resultStore';

const placesUrl = 'https://places.googleapis.com/v1/places/';

const productCollection = collection(db, 'products');
const companyInfoRef = doc(db, 'company', 'companyInfo');

export const getCompanyInfo = async () => {
  try {
    const data = await getDoc(companyInfoRef);
    const companyInfo = data.data();
    if (!companyInfo) return;

    return companyInfo;
  } catch (err) {
    console.log(`Error fetching company info: ${err}`);
  }
};

export async function getProductCount() {
  const snapshot = await getCountFromServer(productCollection);
  return snapshot.data().count;
}

export async function getProducts(
  start: number | DocumentSnapshot,
  perPage: number = 16,
  order: string = 'year',
  filter?: ResultFilters
): Promise<DocumentSnapshot<DocumentData, DocumentData>[]> {
  // TODO: Filtering needs a search provider

  let q;

  if (perPage == -1) {
    q = query(productCollection, orderBy(order));
  } else {
    q = query(
      productCollection,
      orderBy(order),
      startAfter(start),
      limit(perPage)
    );
  }

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
      'X-Api-Key': import.meta.env.PHOTOROOM_API_KEY,
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

export async function getCompanyFiles() {
  const storage = getStorage();
  let storageRef = ref(storage, 'Company');

  const res = await listAll(storageRef);

  const fileURLs = await Promise.all(
    res.items.map(async (item: StorageReference) => {
      const fileUrl = await getDownloadURL(item);

      return { name: item.name, url: fileUrl };
    })
  );
  return fileURLs;
}

export const getGoogleCompanyInfo = async (mapLocation = '') => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.PUBLIC_PLACES_API_KEY,
    'X-Goog-FieldMask': 'places.id',
  });

  const data = {
    textQuery: `${import.meta.env.PUBLIC_COMPANY_NAME}, ${mapLocation}`,
    languageCode: 'sv',
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  };

  try {
    const searchRes = await fetch(`${placesUrl}:searchText`, options);
    const searchResData = await searchRes.json();

    if (!searchResData.places[0]?.id) return;
    const detailsRes = await fetch(
      `${placesUrl}${
        searchResData.places[0]?.id
      }?fields=location,currentOpeningHours,regularOpeningHours,regularSecondaryOpeningHours,userRatingCount,reviews,rating&languageCode=sv&key=${
        import.meta.env.PUBLIC_PLACES_API_KEY
      }`
    );
    const detailsData = await detailsRes.json();

    detailsData.placeId = searchResData.places[0].id;

    return detailsData;
  } catch (err) {
    console.error('Failed to get company info from google: ', err);
  }
};

export const getBrandInfo = async (brand: string) => {
  try {
    const res = await fetch(
      'https://company.clearbit.com/v1/domains/find?name=' + brand,
      {
        headers: {
          Authorization: 'Bearer ' + import.meta.env.CLEARBIT_API_KEY,
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error('Failed to get brand info: ', err);
  }
};

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
  const getRandomElement = (array: string[]) =>
    array[Math.floor(Math.random() * array.length)];

  const generateRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandomArray = (array: string[], maxCount: number) => {
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
