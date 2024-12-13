import express from 'express'
import StudentController from '../controllers/StudentController.js'

const studentRouter = express.Router()

studentRouter.get('/students', StudentController.getAllUsers)
studentRouter.post('/students', StudentController.createStudent)
studentRouter.put('/students/:id', StudentController.updateStudent)
studentRouter.delete('/students/:id', StudentController.deleteStudent)
export default studentRouter;