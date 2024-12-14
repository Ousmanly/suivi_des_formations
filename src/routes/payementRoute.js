import express from 'express'
import PayementController from '../controllers/PayementController.js'
import { addRequestPaymentValidator, deletePaymentValidatore } from '../validators/paymentValidator.js'

const payementRouter = express.Router()

payementRouter.get('/payements', PayementController.getAllPayments)
payementRouter.post('/payements', addRequestPaymentValidator, PayementController.createPayment)
payementRouter.delete('/payements/:id', deletePaymentValidatore, PayementController.deletePayment)
export default payementRouter