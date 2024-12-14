import express from 'express'
import StudentController from '../controllers/StudentController.js'
import { addRequestStudentValidator } from '../validators/studentValidator.js'

const studentRouter = express.Router()

studentRouter.get('/students', StudentController.getAllStudents)
studentRouter.post('/students', addRequestStudentValidator, StudentController.createStudent)
studentRouter.put('/students/:id', StudentController.updateStudent)
studentRouter.delete('/students/:id', StudentController.deleteStudent)
export default studentRouter;