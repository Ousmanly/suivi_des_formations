import express from 'express'
import ModuleController from '../controllers/ModuleController.js';

const moduleRouter = express.Router()

moduleRouter.get('/modules', ModuleController.getModules)
moduleRouter.post('/modules', ModuleController.createModule)
moduleRouter.put('/modules/:id', ModuleController.updateModule)
moduleRouter.delete('/modules/:id', ModuleController.deleteModule)
export default moduleRouter;