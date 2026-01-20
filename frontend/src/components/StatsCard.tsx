type StatsCardProps = {
  value: number;
  label: string;
};

const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <div className="flex h-full w-[120px] flex-col items-center justify-center rounded-2xl border border-white/15 shadow-[inset_0px_20px_50px_theme(colors.cyan.800)]">
      <span className="font-architects-daughter h-fit text-6xl font-medium text-green-500">
        {value}
      </span>
      <p className="text-xs text-green-500">{label}</p>
    </div>
  );
};

export default StatsCard;
