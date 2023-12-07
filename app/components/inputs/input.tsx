"use client";

import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type InputProps = {
  label: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required,
  register,
  errors,
  placeholder,
  disabled,
}) => {
  return (
    <div className="gap-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            "form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6",
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
