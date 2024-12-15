import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import ModuleService from '../services/ModuleService.js';
// import StudentService from '../services/StudentService.js';
// import ProductModel from '../models/ProductModel.js';

const addRequestModuleValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('duration')
    .not()
    .isEmpty()
    .withMessage('Duration is required!')
    .bail(),
  check('price')
    .not()
    .isEmpty()
    .withMessage('Price is required!')
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
const updateModuleValidatore = [
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
      const idExists = await ModuleService.checkModuleById(id);
      if (!idExists) {
        throw new Error('Module not found!');
      }
      return true;
    })
    .bail(),
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long!')
    .isLength({ max: 100 })
    .withMessage('Name must be maximum of 100 characters long!')
    .bail(),
  check('duration')
    .not()
    .isEmpty()
    .withMessage('Duration is required!')
    .bail(),
  check('price')
    .not()
    .isEmpty()
    .withMessage('Price is required!')
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
    addRequestModuleValidator,
    updateModuleValidatore
};
