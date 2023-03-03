import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Index from './components/Index';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root'
import Contact from './components/Contact';
import EditContact from './components/EditContact';
import NewContact from './components/NewContact';

import { loader as rootLoader, action as rootActionHandler } from './routes/root';
import { loader as contactLoader, action as contactActionHandler } from './routes/contacts';
import { action as newActionHandler } from './routes/new';
import { loader as editLoader, action as editActionHandler } from './routes/edit';
import { action as destroyActionHandler } from './routes/destroy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootActionHandler,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: '/contacts/:contactId',
            loader: contactLoader,
            action: contactActionHandler,
            element: <Contact />
          },
          {
            path: '/contacts/new',
            action: newActionHandler,
            element: <NewContact />
          },
          {
            path: '/contacts/:contactId/edit',
            loader: editLoader,
            action: editActionHandler,
            element: <EditContact />
          },
          {
            path: '/contacts/:contactId/destroy',
            action: destroyActionHandler,
            errorElement: <i>Unable to delete the contact</i>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
