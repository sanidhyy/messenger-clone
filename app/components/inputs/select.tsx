"use client";

import ReactSelect from "react-select";

type SelectProps = {
  label: string;
  value?: Record<string, any>;
  onChange: (Value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label
        htmlFor=""
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          menuPortalTarget={document.body}
          isMulti
          styles={{
            // @ts-expect-error Bug
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
