import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../../types/Product'
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
  }

  return result
}


export const cashierApi = createApi({
  reducerPath: 'cashierApi',
  baseQuery: CustomBaseQuery,
  tagTypes: ['Products', 'Checks'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getStatefullProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
      transformResponse: (response: Product[]) => response.map(product => ({ ...product, quantity: 0, isActive: false }))
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    editProduct: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/products/${_id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Products'],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    getChecks: builder.query({
      query: () => '/checks',
      providesTags: ['Checks'],
    }),
    createCheck: builder.mutation({
      query: (body) => ({
        url: '/checks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Checks'],
    }),
    removeCheck: builder.mutation({
      query: (id) => ({
        url: `/checks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Checks'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetStatefullProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useRemoveProductMutation,
  useGetChecksQuery,
  useCreateCheckMutation,
  useRemoveCheckMutation,
} = cashierApi