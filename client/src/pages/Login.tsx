import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'
import { useEffect } from 'react'

export default function Login() {
  const user = useAppSelector(state => state.user.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  return (
    <>
      <LoginForm />
    </>
  )
}