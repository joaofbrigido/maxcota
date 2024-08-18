import { Switch } from "../ui/switch";

type SwitchProps = {
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  className?: string;
  onCheckedChange: (value: boolean) => void;
};

export const CustomSwitch = ({
  name,
  label,
  description,
  checked,
  className,
  onCheckedChange,
}: SwitchProps) => {
  return (
    <div>
      <div className={`flex items-center gap-3 ${className}`}>
        <Switch id={name} checked={checked} onCheckedChange={onCheckedChange} />
        <div>
          <label htmlFor={name} className="font-medium">
            {label}
          </label>
          {description && (
            <p className="text-sm text-stone-400">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
