import { createHashRouter } from 'react-router-dom'
import { Dashboard, Login, Cashier, Products } from './pages'
import RootLayout from './layouts/RootLayout'

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'cashier', element: <Cashier /> },
      { path: 'products', element: <Products /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])