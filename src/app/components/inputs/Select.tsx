"use client";
import { FunctionComponent } from "react";
import RSelect from "react-select";
interface SelectProps {
  disable?: boolean;
  options: Record<string, any>[];
  label?: string;
  value: Record<string, any>;
  onChange: (value: any) => void;
}

const Select: FunctionComponent<SelectProps> = ({
  onChange,
  options,
  value,
  disable,
  label,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <RSelect
          isMulti
          isDisabled={disable}
          value={value}
          onChange={onChange}
          options={options}
          menuPortalTarget={document.body}
          classNames={{
            control: () => "text-sm",
          }}
          styles={{
            menuPortal: (base) => {
              return {
                ...base,
                zIndex: 9999,
              };
            },
          }}
        ></RSelect>
      </div>
    </div>
  );
};

export default Select;
