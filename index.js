import http from 'http'
import https from 'https'
import app from './app.js'
import mongoose from 'mongoose'
import fs from 'fs'
import { createConnection } from './config/db.js'
import { credentials } from './config/credential.js'
import { generatePriceJob, updatePriceJob } from './jobs/api.job.js'

const port = credentials.port || 8000
const env = process.env.nodeEnv

const envAvailable = ['PRODUCTION', 'DEVELOPMENT']

if (envAvailable.indexOf(env) === -1) {
  console.error('Invalid Env - please refer package.json')
  process.exit(0)
}
const httpsOptions =
  process.env.nodeEnv === 'PRODUCTION'
    ? {
        key: fs.readFile(credentials.sslKeyPath),
        cert: fs.readFileSync(credentials.sslCertPath),
      }
    : null

// Asynchronus DB connection
;(async () => {
  try {
    const response = await createConnection(env)
    if (response instanceof Error) throw response
    console.log('DB connection establised!')
  } catch (e) {
    console.error(e.message)
    process.emit('SIGTERM', 0)
  }
})()

// Asynchronusly Setting Cron-jobs
;(async () => {
  try {
    generatePriceJob.start()
    updatePriceJob.start()
  } catch (e) {
    console.log(e.message)
    process.emit('SIGTERM', 0)
  }
})()

// Setting Server Instance based on environment

const serverInstance =
  env !== 'PRODUCTION'
    ? http.createServer(app)
    : https.createServer(httpsOptions, app)

//  Server Started listening on PORT
serverInstance.listen(port)

//  Event listeners for Server - event-name:- listening

serverInstance.on('listening', () => {
  console.log(`Worker ${process.pid} started and listening on ${port}`)
})

//  event listeners for Server - event-name:- error

serverInstance.on('error', (e) => {
  console.error(e.message)
  process.emit('SIGTERM', 0)
})

// Handling process teminal signal

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  serverInstance.close((err) => {
    if (err) console.error(err)
    mongoose.connection.close('false')
    console.log('DB connection closed succesfully!')
    process.exit(0)
  })
  generatePriceJob.stop()
  updatePriceJob.stop()
  console.log('HTTP server shutdown successful!.')
})
