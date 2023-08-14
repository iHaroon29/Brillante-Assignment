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

export const goldPriceTracker = [
  {
    price: 4000 + Math.floor(Math.random() * 1000),
    date: new Date().toISOString().split('T')[0],
  },
]
