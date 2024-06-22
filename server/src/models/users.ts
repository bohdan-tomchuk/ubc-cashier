import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'

const UserSchema = new Schema(
  {
    email: { 
      type: String,
      required: true,
      unique: true
    },
    password: { 
      type: String,
      required: true
    },
    refreshToken: [String]
  },
  {
    statics: {
      signup: async function(email, password) {
        if (!email || !password) {
          throw Error('All fields must be filled')
        }
        if (!isEmail(email)) {
          throw Error('Email is not valid')
        }
        if (!isStrongPassword(password)) {
          throw Error('Password not strong enough')
        }

        const exists = await this.findOne({ email })
      
        if (exists) {
          throw Error('Email already in use')
        }
      
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
      
        const user = await this.create({ email, password: hash })
      
        return user
      },
      login: async function(email, password) {
        if (!email || !password) {
          throw Error('All fields must be filled')
        }

        const user = await this.findOne({ email })

        if (!user) {
          throw Error('User don`t exists or wrong email')
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw Error('Incorrect password')
        }

        return user
      }
    }
  }
)

export const UserModel = model('User', UserSchema)