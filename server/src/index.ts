import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import router from './router'

const app = express()

const whitelist = ['http://localhost:3000', 'https://ubc-cashier-fe.onrender.com']

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

const server = http.createServer(app)

server.listen(8080, () => {
  console.log('Server is running')
})

const MONGO_URL = process.env.MONGO_URL
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (err: any) => console.log(err))

app.use('/api/v1/', router())