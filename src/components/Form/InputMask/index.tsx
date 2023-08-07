import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import StyledFieldset from '../Input/style';


interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password';
    label: string;
    error?: FieldError | undefined;
    register: UseFormRegisterReturn<string>;
    mask?: string;
    id: string;
}

const TextMaskCustom = ({type, label, error, register, id}: InputMaskProps) => { 
  return (
    <StyledFieldset>
      <label htmlFor={id}>{label}</label>
      <InputMask
        mask="(99) 99999-9999"   
        type={type}
        {...register}  
      />
      {error ? (
      <p>{error.message}</p>
      ) : null}
    </StyledFieldset>
  );
}

export {TextMaskCustom}




