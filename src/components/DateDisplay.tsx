import { ClockIcon } from "@heroicons/react/24/outline";

interface IDateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<IDateDisplayProps> = ({ date }) => {
  const formatted = new Date(date).toLocaleString('default', { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className={`flex items-center`}>
      <ClockIcon className={`h-4 mr-1`} />
      <span>{formatted}</span>
    </div>
  )
}

export default DateDisplay;