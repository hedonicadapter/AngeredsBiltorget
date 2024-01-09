import {
  type FieldError,
  type UseFormRegister,
  type RegisterOptions,
  type FieldErrorsImpl,
  type Merge,
} from 'react-hook-form';

export const InputLabelAndError = ({
  register,
  engelska,
  svenska,
  registerOptions,
  placeholder,
  error,
  errorMessage,
  tooltipText,
}: {
  register: UseFormRegister<any>;
  engelska: string;
  svenska: string;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  errorMessage?: string;
  tooltipText?: string;
}) => {
  return (
    <div data-tooltip={tooltipText} className='tooltip label-input-error'>
      <div className='flex flex-row flex-wrap items-baseline justify-between'>
        <label htmlFor={engelska}>{svenska}</label>
        {error && (
          <p className='errorMessage'>{errorMessage ?? svenska + 'saknas.'}</p>
        )}
      </div>
      <input
        className='btn'
        placeholder={placeholder}
        {...register(engelska, registerOptions)}
      />
    </div>
  );
};
