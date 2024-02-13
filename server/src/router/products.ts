import express from 'express'

import { getAllProducts, createNewProduct, deleteProduct, updateProduct } from '../controllers/products'
import isAuth from '../middlewares/isAuth'

export default (router: express.Router) => {
  router.get('/products', getAllProducts)
  router.post('/products', createNewProduct)
  router.delete('/products/:id', deleteProduct)
  router.patch('/products/:id', updateProduct)
}