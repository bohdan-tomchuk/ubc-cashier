import express from 'express'

import { getAllChecks, createNewCheck, deleteCheck } from '../controllers/checks'
import isAuth from '../middlewares/isAuth'

export default (router: express.Router) => {
  router.get('/checks', getAllChecks)
  router.post('/checks', createNewCheck)
  router.delete('/checks/:id', deleteCheck)
}