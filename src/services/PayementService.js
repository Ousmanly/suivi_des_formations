
import prisma from "../config/prisma.js";
import { PaymentSerializer } from "../serializers/payementSerializer.js";

class PayementService {

    static async getPayments() {
        try {
            const payments = await prisma.payment.findMany({
                select: {
                    id: true,
                    paymentDate: true,
                    amount: true,
                    payer: true,
                    payerNumber: true,
                    paymentMode: true,
                    remainingAmount :true,
                    registration: {
                        select: {
                            id: true,
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
                    },
                },
            });

            const serializedPayments = PaymentSerializer.serializerForTable(payments);

            return serializedPayments;
        } catch (error) {
            throw new Error("Error while retrieving payments: " + error.message);
        }
    }

    static async checkPaymentById(id) {
        try {
          const result = await prisma.payment.findFirst({ where: { id } });
          return result ? true : false;
        } catch (error) {
          throw error;
        }
      }
    
    static async addPayement(registrationId, paymentDate, amount, payer, payerNumber, paymentMode) {
        try {
            const registration = await prisma.registration.findUnique({
                where: { id: registrationId },
                include: { payments: true },
            });
    
            if (!registration) {
                throw new Error("Registration not found.");
            }
    
            const totalPaid = registration.payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    
            if (totalPaid + Number(amount) > Number(registration.amount)) {
                throw new Error("Payment exceeds the total amount due.");
            }
    
            const newPayment = await prisma.payment.create({
                data: {
                    paymentDate: new Date(paymentDate).toISOString(),
                    amount: amount,
                    payer: payer,
                    payerNumber: payerNumber,
                    paymentMode: paymentMode,
                    registrationId: registrationId,
                    remainingAmount: Number(registration.amount) - (totalPaid + Number(amount)), 
                },
            });
    
            return newPayment;
        } catch (error) {
            throw new Error("Error while adding payment: " + error.message);
        }
    }
    
    static async checkIfPaymentExceedsTotal(registrationId, amount) {
        try {
          const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
            include: { payments: true },
          });
      
          if (!registration) {
            throw new Error('Registration not found.');
          }
      
          const totalPaid = registration.payments.reduce(
            (sum, payment) => sum + Number(payment.amount),
            0
          );
      
          return totalPaid + Number(amount) > Number(registration.amount);
        } catch (error) {
        }
      }
     

    static async deletePayment(id) {
        try {
            const payment = await prisma.payment.findUnique({
                where: { id },
                include: {
                    registration: {
                        include: { payments: true }, 
                    },
                },
            });
    
            if (!payment) {
                throw new Error("Payment not found");
            }
    
            const registration = payment.registration;
    
            if (!registration) {
                throw new Error("Registration associated with the payment not found");
            }
    
            await prisma.payment.delete({
                where: { id },
            });
    
            return true;
        } catch (error) {
            throw new Error("Error while deleting payment: " + error.message);
        }
    }
    
}

export default PayementService;
