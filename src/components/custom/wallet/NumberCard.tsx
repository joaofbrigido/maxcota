import { BgWhite } from "../BgWhite";

type NumberCardsProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export const NumberCard = ({ title, value, icon }: NumberCardsProps) => {
  return (
    <BgWhite>
      <div className="flex gap-3 items-center justify-between mb-5">
        <h2>{title}</h2>
        {icon}
      </div>
      <h3 className="text-4xl font-bold">{value}</h3>
    </BgWhite>
  );
};
