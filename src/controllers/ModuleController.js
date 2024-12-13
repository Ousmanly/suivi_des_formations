import StudentService from "../services/StudentService.js";

class ModuleController{
    static async getAllUsers(_req, res) {
        const result = await StudentService.getStudent()
        res.status(201).json(result);
    }

    static async createStudent(req, res, next) {
        const {
          fullName,
          phoneNumber,
          email,
          address,
          tutor
        } = req.body;
        try {
          await StudentService.createStudent(
            fullName,
            phoneNumber,
            email,
            address,
            tutor
          );
          res.status(201).json({ message: "Student has been created" });
        } catch (error) {
          throw error;
        }
    }
    static async updateStudent(req, res, next) {
        const id = Number(req.params.id);
        if (id) {
            const {  fullName, phoneNumber, email,address,tutor } = req.body;
            try {
            await StudentService.updateStudent(
                id,
                fullName, 
                phoneNumber, 
                email,
                address,
                tutor
            );
            res.status(200).json({ message: "Student has been updated" });
            } catch (error) {
                res.status(400).json({ message: "Student with this id doesn't exist" });
            }
            next();
        }
    }

    static async deleteStudent(req, res, next) {
        const { id } = req.params;
        try {
          await StudentService.deletStudent(parseInt(id));
          res.status(200).json({ message: "Student has been deleted" });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
        next();
      }

}
export default StudentController