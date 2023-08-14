import { credentials, goldPriceTracker } from '../config/credential.js'
import { CustomError } from '../error/custom.error.js'
import goldModal from '../schema/gold.schema.js'
import { httpRequest } from '../utils/fetch.js'
import { generateGoldPrice, getBestPrice } from '../utils/gold.utils.js'

const goldController = {
  // Controller to Generate Random Gold Prices
  generatePrice(req, res) {
    const {
      time_range_min = 0,
      time_range_max = 30,
      current = false,
      generate = false,
      token = null,
    } = req.query
    if (generate) {
      if (!Boolean(token)) {
        throw CustomError.badRequest('Missing Secret Token!')
      }
      if (token !== credentials.secretToken)
        throw CustomError.badRequest('Invalid Secret Token!')
      generateGoldPrice()
      return res.status(200).send({ status: 'OK' })
    }
    if (current) {
      return res.status(200).send({
        date: goldPriceTracker[goldPriceTracker.length - 1].date,
        price: goldPriceTracker[goldPriceTracker.length - 1].price,
      })
    }
    const { price, date } = getBestPrice(
      Number(time_range_min),
      Number(time_range_max) + 1
    )

    return res.status(200).send({ minGoldPrice: price, date })
  },

  // Controller to fetch prices for a particular Gold Item or All available items.
  async getPrice(req, res) {
    const { id } = req.params
    const { time_range_min = 0, time_range_max = 30 } = req.query
    const itemList = await goldModal.getItem(id)
    const data = await httpRequest(
      `http://localhost:5500/api/v1/goldPrice?time_range_min=${time_range_min}&time_range_max=${time_range_max}`
    )
    if (data instanceof CustomError) throw data

    itemList.forEach((item) => {
      item.bestPrice = Math.min(
        data.minGoldPrice * item.itemWeight,
        item.itemPrice
      )
      item.bestPriceDate = data.date
    })
    return res.status(200).send({ items: itemList })
  },

  // Controller to update prices for a particular Gold Item or All available items.
  async updatePrice(req, res) {
    const data = await httpRequest(
      `http://localhost:5500/api/v1/goldPrice?current=${true}`
    )
    console.log(data)
    if (data instanceof CustomError) throw data
    await goldModal.updateItemPrice(data.price)
    return res.status(200).send({ status: 'OK' })
  },

  // Controller to add items to database
  async addItem(req, res) {
    const newItem = await goldModal.addItem(req.body)
    return res.status(200).send({ newItem })
  },
}

export default goldController
