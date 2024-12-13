import InscriptionService from "../services/InscriptionService.js";

class InscriptionController{
    static async getAllRegistrations(_req, res) {
      const result = await InscriptionService.getRegistrations()
      res.status(201).json(result);
    }

    static async createRegistration(req, res, next) {
      const { studentId, moduleId, startDate, amount } = req.body;

      try {
          const newRegistration = await InscriptionService.addRegistration(studentId, moduleId, startDate, amount);
          res.status(201).json({
              message: "Registration has been created",
              registration: newRegistration,
          });
      } catch (error) {
          res.status(400).json({ message: error.message });
          next(error);
      }
  }

  static async updateRegistration(req, res, next) {
    const { id } = req.params;
    const { startDate, amount, studentId, moduleId } = req.body;

    try {
        const updatedRegistration = await InscriptionService.updateRegistration(
            parseInt(id),
            startDate,
            amount,
            parseInt(studentId),
            parseInt(moduleId)
        );

        res.status(200).json({
            message: "Registration has been updated",
            registration: updatedRegistration,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        next(error);
    }
}

    static async deleteRegistration(req, res, next) {
      const { id } = req.params; 
      try {
          await InscriptionService.deleteRegistration(parseInt(id));
  
          res.status(200).json({ message: "Registration has been deleted successfully" });
      } catch (error) {
          res.status(400).json({ message: error.message });
          next(error);
      }
  }
  
}
export default InscriptionController