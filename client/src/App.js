
import React from 'react';
import {Link} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';

import './index.css';
import './normalize.css'
import ProfilePage from './components/pages/ProfilePage';
import RecentProjects from './components/RecentProjects';
import ProjectPage from './components/pages/ProjectPage';
import testProjects from './testData';
import DonationSuccessPage from './components/pages/DonationSuccessPage';
import Navbar2 from './components/Navbar2';
import Footer2 from './components/Footer2';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import CreateProject from './components/pages/CreateProject';


const rootUrl = 'https://stark-harbor-85471.herokuapp.com'
// const rootUrl = 'http://localhost:3001'


const httpLink = createHttpLink({
  uri: `${rootUrl}/graphql`,
});

// const client = new ApolloClient({
//     uri: '/graphql',
//     cache: new InMemoryCache(),
//   });
 
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

 const App = () => {
    const router = createBrowserRouter([
        {
          path: `${rootUrl}/`,
          // element: <div>Placeholder for homepage <Link to="/profile">Profile Page</Link></div>,
          element: <RecentProjects/>
        },
        {
            path: `${rootUrl}/profile`,
            element: <ProfilePage/>,
          },
          {
            path: `${rootUrl}/project`,
            element: <ProjectPage projects={testProjects} />
          },
          {
            path: `${rootUrl}/project/:projectId`,
            element: <ProjectPage />
            // element: <ProjectPage projects={testProjects} />
          },
          {
            path: `${rootUrl}/create-project`,
            element: <CreateProject />
          },
          // {
          //   path: "/messenger",
          //   element: <CreateMessage />
          // },
          {
            path: `${rootUrl}/donation/success?:dollarAmount&:projectTitle`,
            element: <DonationSuccessPage />
          },
          {
            path: `${rootUrl}/donation/success`,
            element: <DonationSuccessPage />
          }
      ]);
    return (
        <ApolloProvider client={client}>
           <Navbar2 />
                <RouterProvider router={router}>
                </RouterProvider>
            <Footer2 />
        </ApolloProvider>
    );

 }; 
  
export default  App;