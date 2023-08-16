import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import zlib from 'zlib'
import { maxSize, corsOptions } from './config/app.config.js'
import { CustomError } from './error/custom.error.js'
import router from './routes/gold.route.js'

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(cookieParser())
app.use(express.json({ limit: maxSize }))
app.use(express.urlencoded({ extended: true }))
app.use(compression({ level: zlib.constants.Z_BEST_COMPRESSION }))
app.use(morgan('tiny'))

app.use((err, req, res, next) => {
  if (err.status === 400 && err.type === 'entity.parse.failed') {
    next(CustomError.badRequest('Invalid JSON format!'))
  } else {
    next(err)
  }
  next()
})

app.get('/health', async (req, res, next) => {
  try {
    return res
      .status(200)
      .send({ message: 'Healthy :)', date: new Date().toDateString() })
  } catch (e) {
    next(e)
  }
})

app.use('/api/v1', router)

app.use('*', (req, res, next) => {
  next(
    CustomError.invalidRoute(
      'Invalid Route, Please check README.md for a list of available routes!'
    )
  )
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  if (err.status !== 500) {
    return res.status(400).send({ message: err.message, errType: err.errType })
  }
  const { message, errType } = CustomError.internalServerError(
    'Internal Server Error'
  )
  return res.status(status).send({
    message,
    errType,
  })
})

export default app
