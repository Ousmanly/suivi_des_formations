import express from 'express'
import InscriptionController from '../controllers/InscriptionController.js'

const inscriptionRouter = express.Router()

inscriptionRouter.get('/inscriptions', InscriptionController.getAllRegistrations)
inscriptionRouter.post('/inscriptions', InscriptionController.createRegistration)
inscriptionRouter.put('/inscriptions/:id', InscriptionController.updateRegistration)
inscriptionRouter.delete('/inscriptions/:id', InscriptionController.deleteRegistration)
export default inscriptionRouter