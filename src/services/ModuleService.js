import prisma from "../config/prisma.js"

  
class ModuleService{

    static async getModule() {
        try {
          const modules = await prisma.module.findMany();
          return modules;
        } catch (error) {
          throw error;
        }
    }

    // static async createStudent(
    //     fullName,
    //     phoneNumber,
    //     email,
    //     address,
    //     tutor
    //   ) {
    //     try {
    
    //       const newStudent = await prisma.student.create({
    //         data: {
    //           fullName: fullName,
    //           phoneNumber: phoneNumber,
    //           email: email,
    //           address:address,
    //           tutor: tutor
    //         },
    //       });
    //       return newStudent;
    //     } catch (error) {
    //       throw error;
    //     }
    // }


    // static async updateStudent(
    //     id,
    //     fullName,
    //     phoneNumber,
    //     email,
    //     address,
    //     tutor
    //   ) {
    //     try {
    //       const updatedStudent = await prisma.student.update({
    //         where: {
    //           id: id,
    //         },
    //         data: {
    //             fullName : fullName,
    //             phoneNumber :phoneNumber,
    //             email : email,
    //             address : address,
    //             tutor : tutor
    //         },
    //       });
    
    //       return updatedStudent;
    //     } catch (error) {
    //       throw error;
    //     }
    // }
    // static async deletStudent(id) {
    //     try {
    //       const student = await prisma.student.delete({
    //         where: { id: id },
    //       });
    //       return student;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }
}
export default ModuleService