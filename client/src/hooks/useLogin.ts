import { useAuthContext } from './useAuthContext'
import { useLoginMutation } from '../store/services/authApi'

export const useLogin = () => {
  const { dispatch } = useAuthContext()
  const [submitLogin, { isLoading, isError }] = useLoginMutation()

  const login = async (email: string, password: string) => {

    const response = await submitLogin({ email, password })

    if ('data' in response) {
      localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({ type: 'LOGIN', payload: response.data })
    }
  }

  return { login, isLoading, isError }
}