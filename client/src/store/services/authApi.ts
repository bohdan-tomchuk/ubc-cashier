import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, IUserCredentials } from '../../types/User'
import { logout } from '../slices/userSlice'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({ 
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
})

const CustomBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    await baseQuery({ url: '/auth/logout', method: 'POST' }, api, extraOptions)
    api.dispatch(logout())
  }

  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: CustomBaseQuery,
  endpoints: builder => ({
    login: builder.mutation<IUser, IUserCredentials>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    }),
    authCheck: builder.query({ query: () => '/auth/user' })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation
} = authApi