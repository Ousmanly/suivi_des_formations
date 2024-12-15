export const StudentSerializer = {
    serializerForTable(entities) {
      return entities.map((entity) => {
        return {
          id: entity.id,
          fullName: entity.fullName,
          phoneNumber: entity.phoneNumber,
          email: entity.email,
          address: entity.address,
          tutor: entity.tutor
        };
      });
    },
  };
  