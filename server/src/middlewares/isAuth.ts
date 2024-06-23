import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { UserModel } from '../models/users'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!(authHeader as string)?.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = (authHeader as string).split(' ')[1]

  try {
      const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { id: string }

    // @ts-ignore
    req.user = await UserModel.findOne({ _id: id }).select('_id email')
    next()
  } catch (error) {
    res.status(403).json({error: 'Request is not authorized'})
  }
}