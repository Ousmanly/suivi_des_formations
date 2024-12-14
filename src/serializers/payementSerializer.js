export const PaymentSerializer = {
    serializerForTable(entities) {
      return entities.map((entity) => {
        return {
          id: entity.id,
          payment_date: entity.paymentDate,
          amount: entity.amount,
          payer: entity.payer,
          payer_number: entity.payerNumber,
          payment_mode: entity.paymentMode,
          registration_id: entity.registration?.id,
          remainingAmount : entity.remainingAmount,
          student_name: entity.registration?.student?.fullName,
          student_email: entity.registration?.student?.email,
          module_name: entity.registration?.module?.name,
        };
      });
    },
  };
  