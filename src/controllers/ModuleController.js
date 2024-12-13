import ModuleService from "../services/ModuleService.js";

class ModuleController{
    static async getModules(_req, res) {
        const result = await ModuleService.getModules()
        res.status(201).json(result);
    }

    static async createModule(req, res, next) {
        const {
          name,
          duration,
          price
        } = req.body;
        try {
          await ModuleService.createModule(
            name,
            duration,
            price
          );
          res.status(201).json({ message: "Module has been created" });
        } catch (error) {
          res.status(400).json({ message: error.message });
          // throw error;
        }
    }
    static async updateModule(req, res, next) {
        const id = Number(req.params.id);
        if (id) {
            const {   name, duration, price } = req.body;
            try {
            await ModuleService.updateModule(
                id,
                name,
                duration,
                price
            );
            res.status(200).json({ message: "Module has been updated" });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
            next();
        }
    }

    static async deleteModule(req, res, next) {
        const { id } = req.params;
        try {
          await ModuleService.deleteModule(parseInt(id));
          res.status(200).json({ message: "Module has been deleted" });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
        next();
      }

}
export default ModuleController