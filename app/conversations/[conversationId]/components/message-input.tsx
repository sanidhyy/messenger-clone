"use client";

import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type MessageInputProps = {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-200 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
