import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NewClient,{action as newClientAction} from './pages/NewClient'
import Index,{ loader as clientsLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditClient from './pages/EditClient'
import { loader as editClientLoader, action as updateClient } from './pages/EditClient'
import { action as deleteClient } from './components/Client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{
      index: true,
      element: <Index />,
      loader: clientsLoader,
      errorElement:<ErrorPage/>
    },
    {
      path: '/client/new',
      element: <NewClient />,
      action: newClientAction
    },
    {
      path: '/clients/:clientId/edit',
      element: <EditClient/>,
      loader: editClientLoader,
      errorElement: <ErrorPage/>,
      action: updateClient
    },
    {
      path: '/clients/:clientId/delete',
      action: deleteClient,

    }]

  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
