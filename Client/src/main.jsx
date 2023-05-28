import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// import MyRouter provider 

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';


// define my router system : 
const router = createBrowserRouter([
  {
    path: "/",
    element:<Login /> ,
  },
  {
    path: "/register",
    element:<Register />
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
