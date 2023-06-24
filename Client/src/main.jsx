import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// import MyRouter provider 

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Feeds from './pages/Feeds';
import { Settings } from './components';


// define my router system : 
const router = createBrowserRouter([
  {
    path: "/",
    element:<Login /> ,
  },
  {
    path: "/register",
    element:<Register />
  },
  {
    path: "/profile",
    element:<Profile />
  },
  {
    path: "/feeds",
    element:<Feeds />
  },
  {
    path: "/settings",
    element:<Settings />
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
      <RouterProvider router={router} />
        <App />
      </ChakraProvider>
        
  </React.StrictMode>
)
