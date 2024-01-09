import { useForm } from 'react-hook-form';
import type Appraisal from '../Models/Appraisal';
import './styles/forms.css';
import { InputLabelAndError } from './FormComponents';
import { addAppraisal } from '../api';

// https://www.registreringsnummerapi.se/

export default function AppraisalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Appraisal>();

  const submitHandler = (data: Appraisal) => {
    addAppraisal(data);
  };

  return (
    <form className='w-full' onSubmit={handleSubmit(submitHandler)}>
      <fieldset>
        <legend>Om bilen</legend>

        <InputLabelAndError
          error={errors.registrationNumber}
          register={register}
          registerOptions={{ required: true }}
          svenska='Registreringsnummer'
          engelska='registrationNumber'
          placeholder='ABC-123'
        />
        <InputLabelAndError
          error={errors.mileage}
          register={register}
          registerOptions={{ required: true }}
          svenska='Miltal'
          engelska='mileage'
          placeholder='12345'
        />

        <div className='label-input-error'>
          <label htmlFor='otherInfo'>Övrig info</label>
          <textarea
            className='btn'
            placeholder={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloremque optio quibusdam, tempora voluptatem ea minima odit repudiandae deleniti similique porro placeat autem numquam consequuntur consectetur soluta deserunt possimus delectus?'
            }
            {...register('otherInfo')}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Kontaktinformation</legend>
        <InputLabelAndError
          error={errors.name}
          register={register}
          registerOptions={{ required: true }}
          svenska='Namn'
          engelska='name'
          placeholder='Förnamn Efternamn'
        />
        <InputLabelAndError
          error={errors.email}
          errorMessage='Ogiltig e-postadress.'
          register={register}
          registerOptions={{
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          }}
          svenska='E-post'
          engelska='email'
          placeholder='namn@domän.se'
        />
        <InputLabelAndError
          error={errors.phone}
          register={register}
          registerOptions={{ required: true }}
          svenska='Telefonnummer'
          engelska='phone'
          placeholder='07X-XXX XX XX'
        />
      </fieldset>
      <input type='submit' value='Skicka' className='btn' />
    </form>
  );
}
