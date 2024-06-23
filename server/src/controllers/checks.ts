import express from 'express'

import { getChecks, createCheck, deleteCheckById, getChecksCount } from '../models/checks'

type ReqDictionary = {}
type ReqBody = {}
type ReqQuery = { page?: string, limit?: string, date: string}
type ResBody = {}

type RequestHandler = express.Request<ReqDictionary, ResBody, ReqBody, ReqQuery>

export const getAllChecks = async (req: RequestHandler, res: express.Response) => {
  const { page, limit, date } = req.query
  const parsedDate = date.split(',')

  try {
    const checks = await getChecks({ page: +page, limit: +limit, date: parsedDate })
    const checksCount = await getChecksCount({ date: parsedDate })

    return res.status(200).json({
      results: checks,
      page,
      count: checksCount
    }).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

export const createNewCheck = async (req: express.Request, res: express.Response) => {
  try {
    const { date, products } = req.body

    if (!date || !products) {
      return res.sendStatus(400)
    }

    const check: Record<string, any> = await createCheck({ date, products })

    return res.status(200).json(check).end()
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }

}

export const deleteCheck = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    const deletedCheck = await deleteCheckById(id)

    return res.json(deletedCheck)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}