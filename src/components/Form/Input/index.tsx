import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password';
  label: string;
  error?: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
}

export const Input = ({ label, type, error, register }: IInputProps) => (
  <fieldset>
    <label>{label}</label>
    <input  type={type} {...register} />
    {error ? (
      <span>{error.message}</span>
    ) : null}
  </fieldset>
);



