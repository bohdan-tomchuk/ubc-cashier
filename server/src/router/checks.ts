import express from 'express'

import { getAllChecks, createNewCheck, deleteCheck } from '../controllers/checks'
import isAuth from '../middlewares/isAuth'

export default (router: express.Router) => {
  router.get('/checks', isAuth, getAllChecks)
  router.post('/checks', isAuth, createNewCheck)
  router.delete('/checks/:id', isAuth, deleteCheck)
}