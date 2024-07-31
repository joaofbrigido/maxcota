"use client";

import { Input } from "@/components/ui/input";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const CustomInput = ({
  label,
  error,
  onBlur,
  onChange,
  value,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={props.name} className="block mb-3 font-medium">
        {label}
      </label>
      <Input
        type={props.type}
        id={props.name}
        className={`${error ? "border-red-400" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={props.disabled}
        placeholder={props.placeholder}
        required={props.required}
      />
      {error && <p className="text-red-400 mt-1">{error}</p>}
    </div>
  );
};
