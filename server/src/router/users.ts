import express from 'express'

import { signup, login, refresh, logout } from '../controllers/users'

export default (router: express.Router) => {
  router.post('/auth/signup', signup)
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.get('/auth/refresh', refresh)
}