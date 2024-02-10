import { useLocation, Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { useAppSelector } from '../store/index'

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const token = useAppSelector(state => state.user.token)
  const location = useLocation()

  return (
    token
      ? children
      : <Navigate to='/login' state={{ from: location }} replace />
  )
}