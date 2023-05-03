import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// import MyRouter provider 

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './pages/Login';

// define my router system : 
const router = createBrowserRouter([
  {
    path: "/",
    element:<Login /> ,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
      <RouterProvider router={router} />
        <App />
      </ChakraProvider>
        
  </React.StrictMode>
)
