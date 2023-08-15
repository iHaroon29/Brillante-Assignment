import cron from 'node-cron'
import { credentials } from '../config/credential.js'
import { CustomError } from '../error/custom.error.js'

console.log('Setting up Cron-Jobs')

const generatePriceJob = cron.schedule('0 0 0 * * *', async () => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/v1/goldPrice?generate=${true}&token=${
        credentials.secretToken
      }`
    )
    const data = await response.json()
    if (!response.ok) {
      throw CustomError.externalResponseError(data.message, 500)
    }
    console.log(data)
  } catch (e) {
    console.log(e)
  }
})

const updatePriceJob = cron.schedule('0 2 0 * * *', async () => {
  try {
    const response = await fetch(`http://localhost:5500/api/v1/itemPrices`, {
      method: 'PATCH',
    })
    const data = await response.json()
    console.log(data)
  } catch (e) {
    console.log(e)
  }
})
export { generatePriceJob, updatePriceJob }
