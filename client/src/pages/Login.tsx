import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'
import { useEffect } from 'react'

export default function Login() {
  const token = useAppSelector(state => state.user.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  })

  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  )
}