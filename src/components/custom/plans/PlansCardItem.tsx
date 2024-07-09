import { CircleCheck, CircleX } from "lucide-react";

type PlansCardItemProps = {
  title: string;
  description?: string;
  notSupport?: boolean;
};

export const PlansCardItem = ({
  title,
  description,
  notSupport,
}: PlansCardItemProps) => {
  return (
    <li>
      <div className="flex items-center gap-2">
        {notSupport ? (
          <CircleX size={20} className="min-w-5 min-h-5 text-stone-950/40" />
        ) : (
          <CircleCheck size={20} className="min-w-5 min-h-5" />
        )}

        <span className={notSupport ? "text-stone-950/60" : ""}>{title}</span>
      </div>
      {description && (
        <p className="text-sm text-stone-950/60 ml-7">{description}</p>
      )}
    </li>
  );
};
