import { createContext, useReducer, type ReactNode, type Dispatch } from 'react'
import { IUser } from '../types/User'

type AuthAction = { type: 'LOGIN', payload: IUser } | { type: 'LOGOUT' }

interface IAuthState {
  user: IUser | null
}

interface IAuthContext {
  state: IAuthState,
  dispatch: Dispatch<AuthAction>
}

const initialState: IAuthState = {
  user: null
}

export const AuthContext = createContext<IAuthContext>({
  state: initialState,
  dispatch: () => null
})

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default: 
      return state
  }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // @ts-expect-error for future refactoring:)
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const [state, dispatch] = useReducer(authReducer, { user: storedUser })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}