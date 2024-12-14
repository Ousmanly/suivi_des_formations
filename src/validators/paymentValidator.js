import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import StudentService from '../services/StudentService.js';
import PayementService from '../services/PayementService.js';
// import ProductModel from '../models/ProductModel.js';

const addRequestPaymentValidator = [
  check('payer')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('payerNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number is required!')
    .bail()
    .isLength({ min: 11 })
    .withMessage('Phone number must be at least 15 characters long!')
    .isLength({ max: 15 })
    .withMessage('Phone number must be maximum of 15 characters long!')
    .bail(),
  check('paymentMode')
    .not()
    .isEmpty()
    .withMessage('Payment Mode is required!')
    .bail()  
    .custom(async (value) => {
      const validPaymentMode = ['Masrvi', 'Bankily', 'Cash'];
      if (value && !validPaymentMode.includes(value)) {
        throw new Error('Payment mode must be "Masrvi", or "Bankily", or "Cash"!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const updatePaymentValidatore = [
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
      const idExists = await PayementService.checkPaymentById(id);
      if (!idExists) {
        throw new Error('Payement not found!');
      }
      return true;
    })
    .bail(),
    check('payer')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('payerNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number is required!')
    .bail()
    .isLength({ min: 11 })
    .withMessage('Phone number must be at least 15 characters long!')
    .isLength({ max: 15 })
    .withMessage('Phone number must be maximum of 15 characters long!')
    .bail(),
  check('paymentMode')
    .not()
    .isEmpty()
    .withMessage('Payment Mode is required!')
    .bail()  
    .custom(async (value) => {
      const validPaymentMode = ['Masrvi', 'Bankily', 'Cash'];
      if (value && !validPaymentMode.includes(value)) {
        throw new Error('Payment mode must be "Masrvi", or "Bankily", or "Cash"!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deletePaymentValidatore = [
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
      const idExists = await PayementService.checkPaymentById(id);
      if (!idExists) {
        throw new Error('Payement not found!');
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
    addRequestPaymentValidator,
    deletePaymentValidatore
};
