export const RegistrationSerializer = {
  serializerForTable(entities) {
      return entities.map((entity) => {
          return {
              id: entity.id,
              dateRegister: entity.dateRegister,
              startDate: entity.startDate,
              endDate: entity.endDate,
              amount: entity.amount,
              studentName: entity.studentName, // Déjà transformé dans `getRegistrations`
              moduleName: entity.moduleName,  // Déjà transformé dans `getRegistrations`
          };
      });
  },
};
