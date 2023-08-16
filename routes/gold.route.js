import { Router } from 'express'
import tryCatch from '../utils/tryCatch.js'
import goldController from '../controllers/api.controller.js'
import {
  getPriceQueryValidation,
  goldPriceQueryValidation,
} from '../middleware/validation.middleware.js'
import { isAuthenticated } from '../middleware/authentication.middleware.js'

const router = Router()

// API Endpoint to add Items to DB
router.post('/item', tryCatch(goldController.addItem))

// API Endpoint to fetch Current Gold price/ Generate Gold Price/ Fetch min gold-price between day range
router.get(
  '/goldPrice?',
  goldPriceQueryValidation,
  isAuthenticated,
  tryCatch(goldController.generatePrice)
)

// API Endpoint to fetch current price and best price of a single item or entire collection
router.get('/item?', getPriceQueryValidation, tryCatch(goldController.getPrice))

// API Endpoint to update current price for a single item or the entire collection
router.patch('/item?', tryCatch(goldController.updatePrice))

export default router
