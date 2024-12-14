import express from 'express'
import PayementController from '../controllers/PayementController.js'

const payementRouter = express.Router()

payementRouter.get('/payements', PayementController.getAllPayments)
payementRouter.post('/payements', PayementController.createPayment)
payementRouter.put('/payements/:id', PayementController.updatePayment)
payementRouter.delete('/payements/:id', PayementController.deletePayment)
export default payementRouter