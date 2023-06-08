import React from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import './normalize.css'
import App from './App';
import ProfilePage from './components/pages/ProfilePage';
import ProjectPage from './components/pages/ProjectPage';
import testProjects from './testData';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
 


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Placeholder for homepage <Link to="/profile">Profile Page</Link></div>,
  },
  {
      path: "/profile",
      element: <ProfilePage/>,
    },
    {
      path: "/project/:projectId",
      element: <ProjectPage projects={testProjects} />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router}>
    </RouterProvider>
  </ApolloProvider>,
);




