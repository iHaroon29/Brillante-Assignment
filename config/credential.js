import { config } from 'dotenv'
config()

export const credentials = {
  prodDB: process.env.DB_URL_PROD,
  devDB: process.env.DB_URL_DEV,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  sslKeyPath: process.env.SSL_KEY_PATH,
  sslCertPath: process.env.SSL_CERT_PATH,
  secretToken: process.env.SECRET_TOKEN,
}

export const goldPriceTracker = Array(30)
  .fill(4000)
  .map((node) => node + Math.floor(Math.random() * 1000))
