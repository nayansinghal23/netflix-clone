import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: any;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type,
}) => {
  return (
    <input
      type={type}
      className="block rounded-md px-6 pt-3 pb-3 w-full text-md text-white bg-neutral-700 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={true}
    />
  );
};

export default Input;
