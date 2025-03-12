
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './app/pages/HomePage/HomePage.jsx'
import { MovieDetail } from './app/pages/MovieDetail/MovieDetail.jsx'
import { TVShowDetail } from './app/pages/TVShowDetail/TVShowDetail.jsx'
import ModalProvider from './app/context/ModalProvider.jsx'
import RootLayout from './app/layouts/RootLayout.jsx'



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/movie/:id',
        element: <MovieDetail />
      },
      {
        path: '/tv/:id',
        element: <TVShowDetail />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(



  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>


)
