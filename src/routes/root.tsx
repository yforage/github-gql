import { useEffect } from "react"
import { gql, useLazyQuery } from "@apollo/client";
import { SearchRepoByNameQuery } from "@/gql/graphql";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { RootState, useAppDispatch } from "@/store/store";
import { IRepository, setPage, setPagesCount, setRepos, setSearchValue } from "@/store/slices/reposSearchSlice";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import ReposList from "@/components/ReposList";
import Search from "@/components/Search";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const repoQuery = url.searchParams.get("repo");
  const pageQuery = url.searchParams.get("page");
  return { repoQuery, pageQuery };
}

const SEARCH_REPO = gql`
  query SearchRepoByName($name: String!, $cursor: String!) {
    search(first: 5, query: $name, type: REPOSITORY, after: $cursor) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
      }
      nodes {
        ... on Repository {
          id
          name
          url
          stargazerCount
          owner {
            login
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
    }
  }
`

function Root() {
  const { repoQuery, pageQuery } = useLoaderData() as Record<'repoQuery' | 'pageQuery', string>;

  const { searchValue, page, pagesCount } = useSelector((state: RootState) => state.reposSearch);

  const [search, { loading, error, data }] = useLazyQuery<SearchRepoByNameQuery>(SEARCH_REPO);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!repoQuery || !pageQuery) return;

    if (repoQuery !== searchValue) {
      dispatch(setSearchValue(repoQuery));
    }

    if (pageQuery !== page.toString()) {
      dispatch(setPage(Number(pageQuery)));
    }

    search({
      variables: {
        name: repoQuery,
        cursor: btoa(`cursor:${pageQuery === '1' ? '1' : (Number(pageQuery) - 1) * 5}`),
      }
    })
  }, [pageQuery, repoQuery, search]);


  useEffect(() => {
    if (!data?.search.nodes) return;

    const processedRepos = data.search.nodes
      .map((node) => {
        if (node?.__typename !== 'Repository') return;
        const lastCommitDate = node.defaultBranchRef?.target?.__typename === 'Commit' && node.defaultBranchRef.target.history.edges?.[0]?.node?.committedDate;
        return {
          id: node.id,
          name: node.name,
          owner: node.owner.login,
          stars: node.stargazerCount,
          lastCommitDate,
          link: node.url,
        }
    });

    const pages = Math.max(Math.floor(Math.min(data.search.repositoryCount ?? 0, 100) / 10), 1);

    if (pages !== pagesCount) {
      dispatch(setPagesCount(pages));
    }

    dispatch(setRepos(processedRepos as IRepository[]));
  }, [data, dispatch, pagesCount])

  return (
    <div className={`h-screen w-full`}>
      <div className={`h-full mx-auto py-4 flex flex-col space-y-4 w-72 items-center`}>
        <Search />
        {error && <p className={`w-full border border-red-400 bg-red-100 px-4 py-2 rounded-lg font-bold`}>Error {error.message}</p>}
        <div className={`flex flex-col w-full space-y-4 grow justify-center items-center`}>
          {loading && <Spinner className={`text-black`} />}
          {!loading && !error && <ReposList />}
        </div>
        <Pagination />
      </div>
    </div>
  )
}

export default Root;
