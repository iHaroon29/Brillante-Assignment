import { Router } from 'express'
import tryCatch from '../utils/tryCatch.js'
import goldController from '../controllers/api.controller.js'

const router = Router()
router.post('/item', tryCatch(goldController.addItem))
router.get('/goldPrice', tryCatch(goldController.generatePrice))
router.get('/item?', tryCatch(goldController.getPrice))
// router.patch('/item?', tryCatch(exampleController.getExample))

export default router
