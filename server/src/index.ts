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

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  res.setHeader("Access-Control-Allow-Credentials", 'true')
  res.setHeader("Access-Control-Allow-Private-Network", 'true')
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200)

  next()
})

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://ubc-cashier-fe.onrender.com']
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