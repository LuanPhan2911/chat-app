"use client";
import { FunctionComponent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: FunctionComponent<MessageInputProps> = ({
  errors,
  id,
  placeholder,
  required,
  type,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black px-4 py-4 w-full font-light 
        bg-neutral-100 focus:outline-none rounded-full"
      />
    </div>
  );
};

export default MessageInput;
