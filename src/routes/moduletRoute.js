import express from 'express'
import ModuleController from '../controllers/ModuleController.js';
import { addRequestModuleValidator, updateModuleValidatore } from '../validators/moduleValidator.js';

const moduleRouter = express.Router()

moduleRouter.get('/modules', ModuleController.getModules)
moduleRouter.post('/modules', addRequestModuleValidator, ModuleController.createModule)
moduleRouter.put('/modules/:id', updateModuleValidatore, ModuleController.updateModule)
moduleRouter.delete('/modules/:id', ModuleController.deleteModule)
export default moduleRouter;