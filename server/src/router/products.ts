import express from 'express'

import { getAllProducts, createNewProduct, deleteProduct, updateProduct } from '../controllers/products'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
  router.get('/products', getAllProducts)
  router.post('/products', createNewProduct)
  router.delete('/products/:id', deleteProduct)
  router.patch('/products/:id', updateProduct)
}