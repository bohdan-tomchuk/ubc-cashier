import express from 'express'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { UserModel } from '../models/users'
import { createAccessToken, createRefreshToken, timeUntilMidnight } from '../helpers/token'

// signup user
export const signup = async (req: express.Request, res: express.Response) => {
  const {email, password} = req.body

  try {
    const user = await UserModel.signup(email, password)

    // create token
    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: timeUntilMidnight()
    })
    res.status(200).json({email, token: accessToken})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  const {email, password} = req.body
  const cookies = req.cookies

  try {
    const user = await UserModel.login(email, password)

    // create token
    const accessToken = createAccessToken(user._id)
    const newRefreshToken = createRefreshToken(user._id)

    let newRefreshTokenArray = 
      !cookies.jwt
        ? user.refreshToken
        : user.refreshToken.filter(rt => rt !== cookies.jwt)

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt
      const foundToken = await UserModel.findOne({ refreshToken }).exec()

      if (!foundToken) {
        newRefreshTokenArray = []
      }

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true })
    }

    user.refreshToken = [ ...newRefreshTokenArray, newRefreshToken ]
    const result = await user.save()

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: timeUntilMidnight()
    })
    res.status(200).json({email, token: accessToken})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const refresh = async (req: express.Request, res: express.Response) => {
  const cookies = req.cookies
  console.log('refresh', cookies.jwt)
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true })

  const foundUser = await UserModel.findOne({ refreshToken }).exec()
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403)
        const hackedUser = await UserModel.findOne({ id: decoded.id }).exec()
        hackedUser.refreshToken = []
        const result = await hackedUser.save()
      }
    )
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray]
        await foundUser.save()
      }
      if (err || foundUser.id !== decoded.id) return res.sendStatus(403)

      // Refresh token was still valid
      const accessToken = createAccessToken(foundUser._id)

      const newRefreshToken = createRefreshToken(foundUser._id)
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      await foundUser.save()

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: timeUntilMidnight() })

      res.json({ email: foundUser.email, token: accessToken })
    }
  )
}

export const logout = async (req: express.Request, res: express.Response) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });
      return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });
  res.sendStatus(204);
}