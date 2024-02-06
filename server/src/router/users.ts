import express from 'express'

import { signup, login, logout } from '../controllers/users'
import isAuth from '../middlewares/isAuth'

export default (router: express.Router) => {
  router.post('/auth/signup', signup)
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.get('/auth/user', isAuth, (req, res) => {
    // @ts-ignore
    res.json(req.user)
  })
}