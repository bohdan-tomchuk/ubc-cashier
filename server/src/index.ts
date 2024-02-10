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

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
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