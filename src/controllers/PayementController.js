import PayementService from "../services/PayementService.js";

class PayementController{
    static async getAllPayments(req, res) {
        try {
            const payments = await PayementService.getPayments();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createPayment(req, res, next) {
        const { registrationId, paymentDate, amount, payer, payerNumber, paymentMode } = req.body;
  
        try {
            const newPayment = await PayementService.addPayement(registrationId, paymentDate, amount, payer, payerNumber, paymentMode);
            res.status(201).json({
                message: "Payment has been created",
                newPayment: newPayment,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
            next(error);
        }
    }

    static async updatePayment(req, res, next) {
        const { id } = req.params;
        const { paymentDate, amount, payer, payerNumber, paymentMode, registrationId } = req.body;
    
        try {
            const updatedPayment = await PayementService.updatePayment(
                parseInt(id),
                paymentDate,
                amount,
                payer,
                payerNumber,
                paymentMode,
                parseInt(registrationId),
            );
    
            res.status(200).json({
                message: "Payment has been updated",
                payment: updatedPayment,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
            next(error);
        }
    }

    static async deletePayment(req, res, next) {
        const { id } = req.params; 
        try {
            await PayementService.deletePayment(parseInt(id));
    
            res.status(200).json({ message: "Payment has been deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
            next(error);
        }
    }
}
export default PayementController