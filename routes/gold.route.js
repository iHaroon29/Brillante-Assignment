import { Router } from 'express'
import tryCatch from '../utils/tryCatch.js'
import goldController from '../controllers/api.controller.js'
import { queryValidation } from '../middleware/validation.middleware.js'

const router = Router()
router.post('/item', tryCatch(goldController.addItem))
router.get('/goldPrice?', tryCatch(goldController.generatePrice))
router.get('/item/:id?', queryValidation, tryCatch(goldController.getPrice))
router.patch('/itemPrices', tryCatch(goldController.updatePrice))

export default router
