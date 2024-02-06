import express from 'express'

import { getAllProducts, createNewProduct, deleteProduct, updateProduct } from '../controllers/products'
import isAuth from '../middlewares/isAuth'

export default (router: express.Router) => {
  router.get('/products', isAuth, getAllProducts)
  router.post('/products', isAuth, createNewProduct)
  router.delete('/products/:id', isAuth, deleteProduct)
  router.patch('/products/:id', isAuth, updateProduct)
}