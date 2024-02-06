import express from 'express'

import { UserModel } from '../models/users'
import { createToken } from '../helpers/token'

// signup user
export const signup = async (req: express.Request, res: express.Response) => {
  const {email, password} = req.body

  try {
    const user = await UserModel.signup(email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  const {email, password} = req.body

  try {
    const user = await UserModel.login(email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).cookie('token', token, {httpOnly: true}).json({email})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const logout = async (req: express.Request, res: express.Response) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'User logout' })
}