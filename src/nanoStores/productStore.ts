import { persistentAtom } from '@nanostores/persistent';
import type Car from '../Models/Car';

export const cart = persistentAtom<Car[] | undefined>();
