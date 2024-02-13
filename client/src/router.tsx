import { createBrowserRouter } from 'react-router-dom'
import { Dashboard, Cashier, Products } from './pages'
import RootLayout from './layouts/RootLayout'
// import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ProtectedRoute>
      //   <RootLayout />
      // </ProtectedRoute>
      <RootLayout />
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'cashier', element: <Cashier /> },
      { path: 'products', element: <Products /> }
    ]
  }
  // {
  //   path: '/login',
  //   element: <Login />
  // }
])