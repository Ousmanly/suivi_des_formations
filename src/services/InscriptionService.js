import moment from "moment";
import prisma from "../config/prisma.js"
  
class InscriptionService{



    static async getRegistrations() {
        try {
            const registrations = await prisma.registration.findMany({
                include: {
                    payments: {
                        select: {
                            amount: true, 
                        },
                    },
                    student: {
                        select: {
                            id: true,
                            fullName: true, 
                            email: true, 
                        },
                    },
                    module: {
                        select: {
                            id: true,
                            name: true,  
                        },
                    },
                },
            });
    
            const registrationsWithRemainingAmount = registrations.map((registration) => {
                const totalPaid = registration.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
                const remainingAmount = Number(registration.amount) - totalPaid;
    
                return {
                    id: registration.id,
                    dateRegister: registration.dateRegister,
                    startDate: registration.startDate,
                    endDate: registration.endDate,
                    amount: registration.amount,
                    studentId: registration.studentId,
                    moduleId: registration.moduleId,
                    studentName: registration.student.fullName, // Récupération du nom de l'étudiant
                    moduleName: registration.module.name,
                    remainingAmount,
                };
            });
    
            return registrationsWithRemainingAmount;
        } catch (error) {
            throw new Error("Error fetching registrations: " + error.message);
        }
    }
    

    static async addRegistration(studentId, moduleId, startDate, amount =  null) {
      try {
          const module = await prisma.module.findUnique({
              where: { id: moduleId },
          });
          const student = await prisma.student.findUnique({
              where: { id: studentId },
          });

          if (!module) {
              throw new Error("Module not found.");
          }else if (!student) {
            throw new Error("Student not found.");
          }

          const endDate = moment(startDate).add(module.duration, "days").toDate();
        //   const totalAmount = Number(amount) + Number(module.price);
        const finalAmount = amount !== null ? amount : module.price;
          const newRegistration = await prisma.registration.create({
              data: {
                  dateRegister: new Date(),
                  startDate: new Date(startDate),
                  endDate: endDate,
                  amount: finalAmount,
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
        //const totalAmount = Number(module.price);

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
static async checkInscriptionById(id) {
    try {
      const result = await prisma.registration.findFirst({ where: { id } });
      return result ? true : false;
    } catch (error) {
      throw error;
    }
  }

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
}
export default InscriptionService