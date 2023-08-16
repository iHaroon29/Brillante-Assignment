import { credentials, goldPriceTracker } from '../config/credential.js'
import { CustomError } from '../error/custom.error.js'
import goldModal from '../schema/gold.schema.js'
import { httpRequest } from '../utils/fetch.js'
import {
  generateGoldPrice,
  getBestPrice,
  getCurrentPrice,
} from '../utils/gold.utils.js'

const goldController = {
  // Controller to Generate Random Gold Prices
  generatePrice(req, res) {
    const { time_range_max = 30, current = false, generate = false } = req.query
    if (generate) {
      generateGoldPrice()
      return res.status(200).send({ status: 'OK' })
    }
    if (current) {
      const currentPrice = getCurrentPrice()
      return res.status(200).send({ price: currentPrice })
    }
    const { minPrice, date } = getBestPrice(0, Number(time_range_max) + 1)
    return res.status(200).send({ minPrice, date })
  },

  // Controller to fetch prices for a particular Gold Item or All available items.
  async getPrice(req, res) {
    const { time_range_max = 30, id = null } = req.query
    const itemList = await goldModal.getItem(id)
    const data = await httpRequest(
      `http://localhost:5500/api/v1/goldPrice?time_range_max=${time_range_max}&token=${credentials.secretToken}`
    )
    if (data instanceof CustomError) throw data
    itemList.forEach((item) => {
      item.bestPrice = Math.min(data.minPrice * item.itemWeight, item.itemPrice)
      item.bestPriceDate = data.date
    })
    return res.status(200).send({ items: itemList })
  },

  // Controller to update prices for a particular Gold Item or All available items.
  async updatePrice(req, res) {
    const { id } = req.query
    const data = await httpRequest(
      `http://localhost:5500/api/v1/goldPrice?current=${true}&token=${
        credentials.secretToken
      }`
    )
    if (data instanceof CustomError) throw data
    await goldModal.updateItemPrice(id, data.price)
    return res.status(200).send({ status: 'OK' })
  },

  // Controller to add items to database
  async addItem(req, res) {
    const newItem = await goldModal.addItem(req.body)
    return res.status(200).send({ newItem })
  },
}

export default goldController
