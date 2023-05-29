import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { GetFullRepoDataQuery } from "@/gql/graphql";
import { IRepository } from "@/store/slices/reposSearchSlice";
import { RootState } from "@/store/store";
import DateDisplay from "@/components/DateDisplay";
import StarsCount from "@/components/StarsCount";

interface IRepoParams {
  owner: string;
  repoName: string;
}

export async function loader({ params }: any) {
  return params;
}

const GET_PARTIAL_REPO_DATA = gql`
  query GetPartialRepoData($owner: String!, $repoName: String!) {
    repository(name: $repoName, owner: $owner) {
      owner {
        avatarUrl
        url
      }
      description
      languages(first: 15) {
        edges {
          node {
            id
            name
            color
          }
        }
      }
    }
  }
`

const GET_FULL_REPO_DATA = gql`
  query GetFullRepoData($owner: String!, $repoName: String!) {
    repository(name: $repoName, owner: $owner) {
      name
      stargazerCount
      owner {
        login
        avatarUrl
        url
      }
      description
      languages(first: 15) {
        edges {
          node {
            id
            name
            color
          }
        }
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 1) {
              edges {
                node {
                  ... on Commit {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

function Repo() {
  const { repoName, owner } = useLoaderData() as IRepoParams;

  const { repos } = useSelector((state: RootState) => state.reposSearch);

  const [loadedRepo, setLoadedRepo] = useState<IRepository | null>(null);

  const { data } = useQuery<GetFullRepoDataQuery>(repos.length ? GET_PARTIAL_REPO_DATA : GET_FULL_REPO_DATA, {
    variables: {
      owner, 
      repoName,
    }
  })

  useEffect(() => {
    if (!repos.length) return;

    const repo = repos.find((repo) => repo.name === repoName && repo.owner === owner) ?? null;

    setLoadedRepo(repo);
  }, [repoName, owner, repos]);

  return (
    <div className={`h-screen w-full flex items-center`}>
      {data?.repository && (
        <div className={`container mx-auto h-3/6 flex flex-col space-y-2`}>
          <div className={`flex justify-between`}>
            <div>
              <p className={`font-bold text-4xl mb-1`}>{loadedRepo?.name || data.repository.name}</p>
              <StarsCount stars={loadedRepo?.stars || data.repository.stargazerCount} />
              <DateDisplay date={loadedRepo?.lastCommitDate || data.repository.defaultBranchRef?.target?.__typename === 'Commit' && data.repository.defaultBranchRef.target.history.edges?.[0]?.node?.committedDate} />
            </div>
            <a href={data.repository.owner.url} className={`basis-1/3 shrink-0 flex items-center bg-stone-100 shadow rounded-lg px-4 py-2`}>
              <img className={`rounded-full h-16 mr-4`} src={data.repository.owner.avatarUrl} />
              <p className={`font-bold`}>{loadedRepo?.owner || data.repository.owner.login}</p>
            </a>
          </div>
          <div className={`flex justify-between`}>
            <p className={`mt-2 pr-4`}>
              {data.repository.description}
            </p>
            <div className={`space-x-2 space-y-2 flex flex-wrap basis-1/3 items-start shrink-0 mr-2`}>
              {data.repository.languages?.edges?.map((edge) => (
                <span
                  key={edge?.node.id}
                  className={`text-xs px-2 py-1 rounded-lg first:ml-2 first:mt-2 border-2 ${!edge?.node.color ? 'border-stone-100' : ''}`}
                  {...(edge?.node.color && {
                    style: { borderColor: edge?.node.color }
                  })}
                >
                  {edge?.node.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Repo;