'use client';

import clsx from "clsx";

import {
    FieldValues,
    FieldErrors,
    UseFormRegister
}
from 'react-hook-form';
interface InputProps{
    label:string,
    id: string,
    type?:string,
    required?:boolean,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors,
    disable?:boolean

};
const Input: React.FC<InputProps> = ({
    label,
    id,
    errors,
    disable,
    required,
    type="text",
    register,
}) => {
    return ( 
        <div>
            <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input 
                type={type} 
                id={id} 
                autoComplete={id}
                disabled={disable}
                {...register(id, {
                    required,
                })}
                className={
                    clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6`,
                    errors[id] && `focus:ring-rose-700` , disable&& `opacity-50 cursor-default`)
                }
                 />
            </div>
        </div>
     );
}
 
export default Input;