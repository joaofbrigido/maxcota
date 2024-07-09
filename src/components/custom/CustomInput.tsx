import { Input } from "@/components/ui/input";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export const CustomInput = ({ label, error, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={props.name} className="block mb-3 font-medium">
        {label}
      </label>
      <Input
        type="text"
        id={props.name}
        className={`${error ? "border-red-400" : ""}`}
        {...props}
      />
      {error && <p className="text-red-400 mt-1">{error}</p>}
    </div>
  );
};
