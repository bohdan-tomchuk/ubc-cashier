import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../slices/userSlice'
import { IUser } from '../../types/User'
import { RootState } from '../index'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if ([401, 403].includes(result?.error?.status as number)) {
    console.log('sending refresh token')
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if (refreshResult?.data) {
      // store the new token 
      api.dispatch(setCredentials(refreshResult.data as IUser))
      localStorage.setItem('user', JSON.stringify(refreshResult.data))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  // @ts-expect-error because
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: builder => ({})
})