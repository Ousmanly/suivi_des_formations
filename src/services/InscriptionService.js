import moment from "moment";
import prisma from "../config/prisma.js"
  
class InscriptionService{

    // static async checkEmail(email, id = null) {
    //     try {
    //       if (id) {
    //         const student = await prisma.student.findMany({
    //           where: {
    //             email: email,
    //             id: {
    //               not: id,
    //             },
    //           },
    //           select: {
    //             id: true,
    //             email: true,
    //           },
    //         });
    //         return student
    //       } else {
    //         const result = await prisma.student.findFirst({ where: { email } });
    //         return result ? true : false;
    //       }
    //     } catch (error) {
    //       throw error;
    //     }
    //   }

    static async getRegistrations() {
        try {
          const registrations = await prisma.registration.findMany();
          return registrations;
        } catch (error) {
          throw error;
        }
    }

    static async addRegistration(studentId, moduleId, startDate, amount) {
      try {
          const module = await prisma.module.findUnique({
              where: { id: moduleId },
          });

          if (!module) {
              throw new Error("Module introuvable.");
          }

          const endDate = moment(startDate).add(module.duration, "days").toDate();

          const newRegistration = await prisma.registration.create({
              data: {
                  dateRegister: new Date(),
                  startDate: new Date(startDate),
                  endDate: endDate,
                  amount: amount,
                  studentId: studentId,
                  moduleId: moduleId,
              },
          });

          return newRegistration;
      } catch (error) {
          throw error;
      }
  }

  static async updateRegistration(id, startDate, amount, studentId, moduleId) {
    try {
        const registration = await prisma.registration.findUnique({
            where: { id },
        });

        if (!registration) {
            throw new Error("Registration not found");
        }

        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            throw new Error("Student not found");
        }

        const module = await prisma.module.findUnique({
            where: { id: moduleId },
        });

        if (!module) {
            throw new Error("Module not found");
        }

        const endDate = moment(startDate).add(module.duration, "days").toDate();

        const updatedRegistration = await prisma.registration.update({
            where: { id },
            data: {
                startDate: new Date(startDate),
                endDate: endDate,
                amount: amount,
                studentId: studentId,
                moduleId: moduleId,
            },
        });

        return updatedRegistration;
    } catch (error) {
        throw error;
    }
}

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

    static async deleteRegistration(id) {
      try {
          const registration = await prisma.registration.findUnique({
              where: { id },
          });
  
          if (!registration) {
              throw new Error("Registration not found");
          }
          await prisma.registration.delete({
              where: { id },
          });
  
          return true;
      } catch (error) {
          throw error;
      }
  }
  
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
export default InscriptionService