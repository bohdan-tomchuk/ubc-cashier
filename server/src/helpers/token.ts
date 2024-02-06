import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

function timeUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  const timeDifference = midnight.getTime() - now.getTime()
  return Math.floor(timeDifference / 1000)
}

export const createToken = (id: Types.ObjectId) =>  {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + timeUntilMidnight()
  })
}