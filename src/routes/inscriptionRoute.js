import express from 'express'
import InscriptionController from '../controllers/InscriptionController.js'
import { addRequestRegistrationValidator, deleteRegistrationValidatore, updateRegistrationValidatore } from '../validators/registrationValidator.js'

const inscriptionRouter = express.Router()

inscriptionRouter.get('/inscriptions', InscriptionController.getAllRegistrations)
inscriptionRouter.post('/inscriptions', addRequestRegistrationValidator, InscriptionController.createRegistration)
inscriptionRouter.put('/inscriptions/:id', updateRegistrationValidatore, InscriptionController.updateRegistration)
inscriptionRouter.delete('/inscriptions/:id', deleteRegistrationValidatore, InscriptionController.deleteRegistration)
export default inscriptionRouter