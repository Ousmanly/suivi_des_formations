import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import InscriptionService from '../services/InscriptionService.js';

const addRequestRegistrationValidator = [
  check('amount')
  .not()
  .isEmpty()
  .withMessage('Amount is required!')
  .bail()
  .isFloat({ min: 0.01 })
  .withMessage('Amount must be a positive number!')
  .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const updateRegistrationValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await InscriptionService.checkInscriptionById(id);
      if (!idExists) {
        throw new Error('Registration not found!');
      }
      return true;
    })
    .bail(),
    check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount is required!')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number!')
    .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ errors: errors.array() });
      next();
    },
];
const deleteRegistrationValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value);
      const idExists = await InscriptionService.checkInscriptionById(id);
      if (!idExists) {
        throw new Error('Registration not found!');
      }
      return true;
    })
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export {
    addRequestRegistrationValidator,
    updateRegistrationValidatore,
    deleteRegistrationValidatore
};
