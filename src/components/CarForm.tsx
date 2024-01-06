import { useState, type FormEvent, type SyntheticEvent } from 'react';
import { postProductImage } from '../api.ts';
import { useForm, submitHandler } from 'react-hook-form';

type Car = {
  id?: string;
  title?: string;
  price: number;
  description?: string;
  make: string;
  model: string;
  year: number;
  mileage?: number; // Mätarställning
  registrationNumber?: string; // Registreringsnummer
  gearbox: string; // Växellåda
  fuelType: string; // Drivmedel
  vehicleType?: string; // Fordonstyp
  color?: string;
  extraFeatures?: string[];
};

const defaultValues: Car = {
  title: '',
  price: 0,
  description: '',
  make: '',
  model: '',
  year: 0,
  mileage: 0,
  registrationNumber: '',
  gearbox: '',
  fuelType: '',
  vehicleType: '',
  color: '',
  extraFeatures: [],
};

export default function CarForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Car>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input className='btn' {...register('title')} />
      <input className='btn' {...register('price')} />
      <input className='btn' {...register('description')} />
      <input className='btn' {...register('make', { required: true })} />
      {errors.make && <p>Bilmärket saknas.</p>}
      <input className='btn' {...register('model', { required: true })} />
      {errors.make && <p>Fabrikatet/bilmärket saknas.</p>}
      <input className='btn' {...register('year')} />
      <input className='btn' {...register('mileage')} />
      <input className='btn' {...register('registrationNumber')} />
      <input
        className='btn'
        {...register('gearbox', {
          validate: (val) =>
            val.toLowerCase() == 'automat' || val.toLowerCase() == 'manuell',
        })}
      />
      <input className='btn' {...register('fuelType')} />
      <input className='btn' {...register('vehicleType')} />
      <input className='btn' {...register('color')} />
      {/* <input className='btn' {...register('extraFeatures')} /> */}
      <input className='btn' type='submit' />
    </form>
  );
}
