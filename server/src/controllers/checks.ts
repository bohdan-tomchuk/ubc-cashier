import express from 'express'

import { getChecks, createCheck, deleteCheckById } from '../models/checks'

export const getAllChecks = async (req: express.Request, res: express.Response) => {
  try {
    const checks = await getChecks()

    return res.status(200).json(checks).end()
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