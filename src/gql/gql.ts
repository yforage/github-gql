/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetPartialRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      owner {\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n": types.GetPartialRepoDataDocument,
    "\n  query GetFullRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      name\n      stargazerCount\n      owner {\n        login\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 1) {\n              edges {\n                node {\n                  ... on Commit {\n                    committedDate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFullRepoDataDocument,
    "\n  query SearchRepoByName($name: String!, $cursor: String!) {\n    search(first: 5, query: $name, type: REPOSITORY, after: $cursor) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          stargazerCount\n          owner {\n            login\n          }\n          defaultBranchRef {\n            target {\n              ... on Commit {\n                history(first: 1) {\n                  edges {\n                    node {\n                      ... on Commit {\n                        committedDate\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.SearchRepoByNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPartialRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      owner {\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPartialRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      owner {\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFullRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      name\n      stargazerCount\n      owner {\n        login\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 1) {\n              edges {\n                node {\n                  ... on Commit {\n                    committedDate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFullRepoData($owner: String!, $repoName: String!) {\n    repository(name: $repoName, owner: $owner) {\n      name\n      stargazerCount\n      owner {\n        login\n        avatarUrl\n        url\n      }\n      description\n      languages(first: 15) {\n        edges {\n          node {\n            id\n            name\n            color\n          }\n        }\n      }\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            history(first: 1) {\n              edges {\n                node {\n                  ... on Commit {\n                    committedDate\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRepoByName($name: String!, $cursor: String!) {\n    search(first: 5, query: $name, type: REPOSITORY, after: $cursor) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          stargazerCount\n          owner {\n            login\n          }\n          defaultBranchRef {\n            target {\n              ... on Commit {\n                history(first: 1) {\n                  edges {\n                    node {\n                      ... on Commit {\n                        committedDate\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchRepoByName($name: String!, $cursor: String!) {\n    search(first: 5, query: $name, type: REPOSITORY, after: $cursor) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      nodes {\n        ... on Repository {\n          id\n          name\n          url\n          stargazerCount\n          owner {\n            login\n          }\n          defaultBranchRef {\n            target {\n              ... on Commit {\n                history(first: 1) {\n                  edges {\n                    node {\n                      ... on Commit {\n                        committedDate\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;