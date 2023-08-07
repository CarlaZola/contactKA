import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import StyledFieldset from './style';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password';
  label: string;
  error?: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
}

export const Input = ({ label, type, error, register }: IInputProps) => (
  <StyledFieldset>
    <label>{label}</label>
    <input  type={type} {...register} />
    {error ? (
      <p>{error.message}</p>
    ) : null}
  </StyledFieldset>
);



