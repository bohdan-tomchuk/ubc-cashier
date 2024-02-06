import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../hooks/useAuthContext'

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { state } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state.user === null) {
      navigate('/login', { replace: true })
    }
  }, [navigate, state.user])

  return children
}