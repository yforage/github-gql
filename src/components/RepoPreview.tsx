import DateDisplay from "@/components/DateDisplay";
import StarsCount from "@/components/StarsCount";

interface IRepoPreviewProps {
  name: string;
  starsCount: number;
  lastCommitDate: string;
  link: string;
  owner: string;
}

const RepoPreview: React.FC<IRepoPreviewProps> = ({ name, starsCount, lastCommitDate, link, owner }) => {

  const handleGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation();

  return (
    <div className={`bg-stone-100 rounded-lg px-4 py-2 transition-shadow hover:shadow`}>
      <p className={`w-full text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap`}>{`${owner}/${name}`}</p>
      <StarsCount stars={starsCount} />
      <div className={`flex justify-between`}>
        <a
          className={`hover:text-stone-700 transition-colors`}
          href={link}
          target="_blank"
          onClick={handleGithubClick}
        >
          GitHub
        </a>
        <DateDisplay date={lastCommitDate} />
      </div>
    </div>
  )
}

export default RepoPreview;