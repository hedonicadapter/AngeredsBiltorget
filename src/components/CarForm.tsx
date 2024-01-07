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
} from '../api.ts';
import { useForm } from 'react-hook-form';
import './styles/car-form.css';
import { motion } from 'framer-motion';
import type Car from '../Models/Car.ts';
import Dropdown from './Dropdown.tsx';

export default function CarForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<Car & { files: File[] | { name: string; url: string } }>();

  const makeModelOnChange = watch(['make', 'model']);
  const idOnChange = watch(['id']);
  const filesOnChange = watch(['files']);

  const [isExistingProduct, setIsExistingProduct] = useState(false);

  const registerFiles = register('files');

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

  const handleFilesOnChange = (evt: SyntheticEvent) => {
    const oldFiles = filesOnChange[0] ? Object.values(filesOnChange[0]) : null;

    registerFiles.onChange(evt);

    const newFiles = Array.from(evt.target.files);
    const allFiles = [...oldFiles, ...newFiles];

    setValue('files', allFiles);

    evt.target.value = '';
  };

  const handleRemoveButtonClick = (fileName: string) => {
    const currentFiles = filesOnChange[0]
      ? Object.values(Object.values(filesOnChange[0]))
      : null;
    const newFiles = currentFiles?.filter((f) => f.name != fileName);

    setValue('files', newFiles);

    if (!isExistingProduct) return;
    const id = getValues('id');
    if (!id) return;

    deleteProductFile(fileName, id);
  };

  useEffect(() => {
    if (!isExistingProduct) return;

    const files = getProductFiles(getValues('id')).then((res) => {
      if (!res) return;

      setValue('files', res);
    });
  }, [isExistingProduct]);

  return (
    <form
      className='flex flex-col w-full mx-auto gap-6 p-6 rounded-md md:w-[60vw] bg-surface-dark'
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div
        className='tooltip'
        data-tooltip='Lämna tom så autogenereras ett ID. Använd ett existerande ID för att redigera en bil.'
      >
        <input
          className='w-full btn'
          placeholder={'Id'}
          {...register('id')}
          onBlur={handleIdBlur}
        />
      </div>
      <input
        className='btn'
        placeholder={'Fabrikat/bilmärke'}
        {...register('make', { required: true })}
      />
      {errors.make && <p>Fabrikatet/bilmärket saknas.</p>}
      <input
        className='btn'
        placeholder={'Modell'}
        {...register('model', { required: true })}
      />
      {errors.make && <p>Modell saknas.</p>}

      <div
        className='tooltip'
        data-tooltip={
          makeModelOnChange?.some((x) => x)
            ? `Lämna tom så blir titeln ${
                makeModelOnChange[0] + ' ' + makeModelOnChange[1]
              }`
            : ''
        }
      >
        <input
          className='w-full btn'
          placeholder={'Titel'}
          {...register('title')}
        />
      </div>
      <input className='btn' placeholder={'Pris'} {...register('price')} />

      <input className='btn' placeholder={'År'} {...register('year')} />
      <input className='btn' placeholder={'Miltal'} {...register('mileage')} />
      <input
        className='btn'
        placeholder={'Registreringsnummer'}
        {...register('registrationNumber')}
      />

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

      <input
        className='btn'
        placeholder={'Drivmedel'}
        {...register('fuelType')}
      />
      <input
        className='btn'
        placeholder={'Fordonstyp'}
        {...register('vehicleType')}
      />
      <input className='btn' placeholder={'Färg'} {...register('color')} />

      <textarea
        className='btn'
        placeholder={'Beskrivning'}
        {...register('description')}
      />
      {/* <input className='btn' {...register('extraFeatures')} /> */}

      {idOnChange[0] && (
        <>
          <input
            className='btn'
            type='file'
            multiple
            {...registerFiles}
            onChange={handleFilesOnChange}
          />

          {filesOnChange[0] &&
            Object.values(filesOnChange[0])?.map((file) => {
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
                    <p>{file.name}</p>
                  </div>
                  <div>
                    <Dropdown
                      title='Typ'
                      disabled={isImage ? false : true}
                      multiple={false}
                      selected={isImage ? fileNameCapitalized : 'Annat'}
                      options={['Thumbnail', 'Huvudbild', 'Annat']}
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