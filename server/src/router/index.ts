import express from 'express'

import users from './users'
import products from './products'
import checks from './checks'

const router = express.Router()

export default (): express.Router => {
  users(router)
  products(router)
  checks(router)
  
  return router
}