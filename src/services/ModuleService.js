import prisma from "../config/prisma.js"


class ModuleService {

  static async getModules() {
    try {
      const modules = await prisma.module.findMany();
      return modules;
    } catch (error) {
      throw error;
    }
  }
  static async checkModuleById(id) {
    try {
      const result = await prisma.module.findFirst({ where: { id } });
      return result ? true : false;
    } catch (error) {
      throw error;
    }
  }
  static async createModule(
    name,
    duration,
    price
  ) {
    try {

      const newModule = await prisma.module.create({
        data: {
          name : name,
          duration : duration,
          price : price
        },
      });
      return newModule;
    } catch (error) {
      throw error;
    }
  }


  static async updateModule(
      id,
      name,
      duration,
      price
    ) {
      try {
        const updatedModule = await prisma.module.update({
          where: {
            id: id,
          },
          data: {
            name : name,
            duration : duration,
            price : price
          },
        });

        return updatedModule;
      } catch (error) {
        throw error;
      }
  }

  static async deleteModule(id) {
      try {
        const module = await prisma.module.delete({
          where: { id: id },
        });
        return module;
      } catch (error) {
        throw error;
      }
    }
}
export default ModuleService