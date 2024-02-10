import { baseApi } from './baseApi'
import { Product } from '../../types/Product'


export const cashierApi = baseApi.enhanceEndpoints({ addTagTypes: ['Products', 'Checks'] }).injectEndpoints({
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