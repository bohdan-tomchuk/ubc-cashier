import { IUser, IUserCredentials } from '../../types/User'
import { baseApi } from './baseApi'


export const authApi =  baseApi.injectEndpoints({
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
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation
} = authApi