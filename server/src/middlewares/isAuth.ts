import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { UserModel } from '../models/users'

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY) as { id: string }

    // @ts-ignore
    req.user = await UserModel.findOne({ _id: id }).select('_id email')
    next()
  } catch (error) {
    res.clearCookie('token')
    res.status(401).json({error: 'Request is not authorized'})
  }
}