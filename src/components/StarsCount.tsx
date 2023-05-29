import { StarIcon } from "@heroicons/react/24/outline";

interface IStarsCountProps {
  stars: number;
}

const StarsCount: React.FC<IStarsCountProps> = ({ stars }) => (
  <div className={`flex items-center`}>
    <StarIcon className={`h-4 mr-1 text-yellow-400`} />
    <span>{stars}</span>
  </div>
)

export default StarsCount;