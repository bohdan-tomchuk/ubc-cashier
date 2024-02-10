import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export function timeUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  return midnight.getTime() - now.getTime()
}


export const createAccessToken = (id: Types.ObjectId) =>  {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s'

  })
}

export const createRefreshToken = (id: Types.ObjectId) =>  {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: timeUntilMidnight()
  })
}