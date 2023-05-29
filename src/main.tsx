import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import './index.css'

import Root, { loader as rootLoader } from './routes/root.tsx'
import Repo, { loader as repoLoader } from './routes/repo.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
  },
  {
    path: ':owner/:repoName',
    element: <Repo />,
    loader: repoLoader,
  }
])

const apolloClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: import.meta.env.VITE_GITHUB_AUTH,
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)
