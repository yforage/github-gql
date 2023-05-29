import { RootState } from "@/store/store";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import RepoPreview from "./RepoPreview";

const ReposList: React.FC = () => {
  const { repos } = useSelector((state: RootState) => state.reposSearch);

  return (
    <div className={`w-full flex flex-col space-y-2 grow`}>
      {repos.map((repo) => (
        <Link key={repo.id} to={`/${repo.owner}/${repo.name}`}>
          <RepoPreview
            name={repo.name}
            starsCount={repo.stars}
            link={repo.link}
            lastCommitDate={repo.lastCommitDate}
            owner={repo.owner}
          />
        </Link>
      ))}
    </div>
  )
}

export default ReposList;