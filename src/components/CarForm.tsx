import {
  useState,
  type FormEvent,
  type SyntheticEvent,
  useEffect,
} from 'react';
import {
  postProductFile,
  getProductById,
  getProductFiles,
  deleteProductFile,
  upsertProductFiles,
  upsertProduct,
} from '../api.ts';
import { useForm, useFieldArray } from 'react-hook-form';
import './styles/car-form.css';
import { motion } from 'framer-motion';
import type Car from '../Models/Car.ts';
import Dropdown from './Dropdown.tsx';

export default function CarForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<Car & { files: File[] | { name: string; url: string }[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'extraFeatures',
  });

  const makeModelOnChange = watch(['make', 'model']);
  const idOnChange = watch(['id']);
  const filesOnChange = watch(['files']);

  const [isExistingProduct, setIsExistingProduct] = useState(false);

  const { onChange, ref } = register('files');

  const handleIdBlur = async () => {
    const id = getValues('id');
    if (!id) return;

    getProductById(id).then(async (res) => {
      if (!res) {
        setIsExistingProduct(false);
        return;
      }

      reset(res);
      setValue('id', id);
      setValue('gearbox', res.gearbox.toLowerCase());
      setIsExistingProduct(true);
    });
  };

  const handleFilesOnChange = (evt: any) => {
    const oldFiles = filesOnChange[0] ? Object.values(filesOnChange[0]) : null;

    const newFiles = Array.from(evt.target.files);
    const allFiles = oldFiles ? [...oldFiles, ...newFiles] : newFiles;

    setValue('files', allFiles);

    evt.target.value = '';
    onChange(evt);
  };

  const handleRemoveButtonClick = (fileName: string) => {
    const currentFiles = filesOnChange[0]
      ? Object.values(Object.values(filesOnChange[0]))
      : null;
    const newFiles = currentFiles?.filter((f) => f.name != fileName);

    newFiles && setValue('files', newFiles);

    if (!isExistingProduct) return;
    const id = getValues('id');
    if (!id) return;

    deleteProductFile(fileName, id);
  };

  const handleRadioButtonChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { file } = evt.detail;

    const checkedValue = evt.target.nextSibling?.textContent;
    const currentFiles = filesOnChange[0]
      ? Object.values(Object.values(filesOnChange[0]))
      : null;

    const newFiles = currentFiles?.map((f) => {
      if (f.name == file) {
        const extension = f.name.split('.')[1];

        if (checkedValue == 'Huvudbild') f.name = 'main.' + extension;
        else if (checkedValue == 'Thumbnail') f.name = 'thumbnail.' + extension;
      }
      return f;
    });

    setValue('files', newFiles);
  };

  const submitHandler = async (data) => {
    const id = getValues('id');
    if (!id) return;

    await upsertProduct(data);
    await upsertProductFiles(id, data.files);
  };

  useEffect(() => {
    if (!isExistingProduct) return;

    const id = getValues('id');
    if (!id) return;

    getProductFiles(id).then((res) => {
      if (!res) return;
      setValue('files', res);
    });
  }, [isExistingProduct]);

  return (
    <form
      className='flex flex-col w-full mx-auto gap-6 p-6 rounded-md md:w-[60vw] bg-surface-dark'
      onSubmit={handleSubmit(submitHandler)}
    >
      <div
        className='tooltip label-input-error'
        data-tooltip='Lämna tom så autogenereras ett ID. Använd ett existerande ID för att redigera en bil.'
      >
        <label htmlFor='id'>ID</label>
        <input
          className='w-full btn'
          placeholder={'Id'}
          {...register('id')}
          onBlur={handleIdBlur}
        />
      </div>
      <div className='label-input-error'>
        <label htmlFor='make'>Fabrikat/bilmärke</label>
        <input
          className='btn'
          placeholder={'Hyundai'}
          {...register('make', { required: true })}
        />

        {errors.make && (
          <p className='errorMessage'>Fabrikatet/bilmärket saknas.</p>
        )}
      </div>

      <div class='label-input-error'>
        <label htmlFor='model'>Modell</label>
        <input
          className='btn'
          placeholder={'Grandeur Heritage Series'}
          {...register('model', { required: true })}
        />
        {errors.make && <p className='errorMessage'>Modell saknas.</p>}
      </div>

      <div
        className='tooltip label-input-error'
        data-tooltip={
          makeModelOnChange?.some((x) => x)
            ? `Lämna tom så blir titeln ${
                makeModelOnChange[0] + ' ' + makeModelOnChange[1]
              }`
            : ''
        }
      >
        <label htmlFor='title'>Titel</label>
        <input
          className='w-full btn'
          placeholder={'Titel'}
          {...register('title')}
        />
      </div>

      <div
        className='tooltip label-input-error'
        data-tooltip='Bara siffror, inget annat.'
      >
        <label htmlFor='price'>Pris</label>
        <input className='btn' placeholder={'Pris'} {...register('price')} />
      </div>

      <div className='label-input-error'>
        <label htmlFor='year'>År</label>
        <input className='btn' placeholder={'2021'} {...register('year')} />
      </div>
      <div className='label-input-error'>
        <label htmlFor='mileage'>Miltal</label>
        <input
          className='btn'
          placeholder={'Miltal'}
          {...register('mileage')}
        />
      </div>

      <div className='label-input-error'>
        <label htmlFor='registrationNumber'>Registreringsnummer</label>
        <input
          className='btn'
          placeholder={'ABC-123'}
          {...register('registrationNumber')}
        />
      </div>

      <div>
        <div className='flex flex-row items-center gap-2'>
          <input
            {...register('gearbox', { required: true })}
            value='automat'
            id='automat'
            type='radio'
          />
          <label htmlFor='automat'>Automat</label>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <input
            {...register('gearbox')}
            value='manuell'
            id='manuell'
            type='radio'
          />
          <label htmlFor='manuell'>Manuell</label>
        </div>
        {errors.gearbox && <p className='errorMessage'>Växellåda saknas.</p>}
      </div>

      <div className='label-input-error'>
        <label htmlFor='fuelType'>Drivmedel</label>
        <input
          className='btn'
          placeholder={'El, bensin, diesel, etanol, gas, hybrid'}
          {...register('fuelType')}
        />
      </div>

      <div className='label-input-error'>
        <label htmlFor='vehicleType'>Fordonstyp</label>
        <input
          className='btn'
          placeholder={'Fordonstyp'}
          {...register('vehicleType')}
        />
      </div>
      <input className='btn' placeholder={'Färg'} {...register('color')} />

      <div className='label-input-error'>
        <label htmlFor='description'>Beskrivning</label>
        <textarea
          className='btn'
          placeholder={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloremque optio quibusdam, tempora voluptatem ea minima odit repudiandae deleniti similique porro placeat autem numquam consequuntur consectetur soluta deserunt possimus delectus?'
          }
          {...register('description')}
        />
      </div>

      <div className='label-input-error'>
        <label htmlFor='extraFeatures'>Extrafunktioner</label>
        {fields.map((field, index) => (
          <div className='flex flex-row gap-4' key={field.id}>
            <input
              className='flex-1'
              {...register(`extraFeatures.${index}`)}
              defaultValue={''}
            />

            <button type='button' onClick={() => remove(index)}>
              Ta bort
            </button>
          </div>
        ))}
      </div>

      <button className='btn' type='button' onClick={() => append('')}>
        Lägg till
      </button>

      {idOnChange[0] && (
        <>
          <input
            className='btn'
            type='file'
            multiple
            ref={ref}
            onChange={handleFilesOnChange}
          />
          {filesOnChange[0] &&
            Object.values(filesOnChange[0])?.map((file) => {
              if (!file) return;

              const isImage = file.url || file.type?.startsWith('image/');
              const fileNameWithoutExtension = file.name?.split('.')[0];
              const fileNameCapitalized = // storage files are named by their type e.g. 'thumbnail'
                fileNameWithoutExtension.slice(0, 1).toUpperCase() +
                fileNameWithoutExtension.slice(1);

              return (
                <div className='flex flex-row items-center justify-between gap-3 child:flex child:flex-row child:items-center child:gap-3'>
                  <div>
                    {isImage && (
                      <img
                        key={file.name}
                        className='w-20 h-20 rounded-md'
                        src={file.url ?? URL.createObjectURL(file)}
                      />
                    )}
                    <p className='text-nowrap'>{file.name}</p>
                  </div>
                  <div>
                    <Dropdown
                      title='Typ'
                      disabled={isImage ? false : true}
                      multiple={false}
                      selected={isImage ? fileNameCapitalized : 'Annat'}
                      options={['Thumbnail', 'Huvudbild', 'Annat']}
                      handleOnChange={(evt) => {
                        evt.detail = { file: file.name };
                        handleRadioButtonChange(evt);
                      }}
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveButtonClick(file.name)}
                      className='btn whitespace-nowrap'
                    >
                      Ta bort
                    </button>
                  </div>
                </div>
              );
            })}
        </>
      )}

      <motion.input
        whileTap={{ opacity: 0.4, scale: 0.99 }}
        className='cursor-pointer btn'
        type='submit'
      />
    </form>
  );
}
