import React from 'react';
import ReactDOM from 'react-dom/client';
import {Link} from 'react-router-dom';
import './index.css';
import './normalize.css'
import App from './App';
import ProfilePage from './components/pages/ProfilePage';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Placeholder for homepage <Link to="/profile">Profile Page</Link></div>,
    },
    {
        path: "/profile",
        element: <ProfilePage/>,
      }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);


