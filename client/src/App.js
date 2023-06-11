// import React from 'react';
// import AppContainer from './components/AppContainer';

// const App = () => {

// return <AppContainer />;

// }

// export default App;

import React from 'react';
import {Link} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import './normalize.css'
import ProfilePage from './components/pages/ProfilePage';
import ProjectPage from './components/pages/ProjectPage';
import testProjects from './testData';
import DonationSuccessPage from './components/pages/DonationSuccessPage';
import Navbar from 'components/Navbar';
import Footer from './components/Footer';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import CreateProject from './components/pages/CreateProject';


  



const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
 
   
 const App = () => {
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
          },
          {
            path: "/create-project",
            element: <CreateProject />
          },
          {
            path: "/donation/success?:dollarAmount&:projectTitle",
            element: <DonationSuccessPage />
          },
          {
            path: "/donation/success",
            element: <DonationSuccessPage />
          }
      ]);
    return (
        <ApolloProvider client={client}>
           <Navbar />

                <RouterProvider router={router}>
                </RouterProvider>
            <Footer />
        </ApolloProvider>
    );

 }; 
  
export default  App;