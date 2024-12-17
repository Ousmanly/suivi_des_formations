import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import StudentService from '../services/StudentService.js';
// import ProductModel from '../models/ProductModel.js';

const addRequestStudentValidator = [
  check('fullName')
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
  check('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number is required!')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Name must be at least 8 characters long!')
    .isLength({ max: 15 })
    .withMessage('Name must be maximum of 15 characters long!')
    .bail()
    .custom(async (value) => {
      const phoneExists = await StudentService.checkPhoneNumber(value);
      if (phoneExists) {
        throw new Error('This phone number is already exist!');
      }
      return true;
    }),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Email must be maximum of 100 characters long!')
    .custom(async (value) => {
      const emailExists = await StudentService.checkEmail(value);
      if (emailExists) {
        throw new Error('This email is already exist!');
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
const updateStudentValidatore = [
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
      const idExists = await StudentService.checkStudentById(id);
      if (!idExists) {
        throw new Error('Student not found!');
      }
      return true;
    })
    .bail(),
    check('fullName')
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
    check('phoneNumber')
      .not()
      .isEmpty()
      .withMessage('Phone number is required!')
      .bail()
      .isLength({ min: 8 })
      .withMessage('Name must be at least 8 characters long!')
      .isLength({ max: 15 })
      .withMessage('Name must be maximum of 15 characters long!')
      .bail()
      .custom(async (value, { req }) => {
        const id = req.params.id;
        const result = await StudentService.checkStudent(value, parseInt(id));
        if (result.length !== 0) {
          throw new Error('This  is already exist!');
        }
        return true;
      }),
    check('email')
      .not()
      .isEmpty()
      .withMessage('email is required!')
      .bail()
      .isLength({ max: 100 })
      .withMessage('Email must be maximum of 100 characters long!')
      .custom(async (value, { req }) => {
        const id = req.params.id;
        const result = await StudentService.checkEmail(value, parseInt(id));
        if (result.length !== 0) {
          throw new Error('This email is already exist!');
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
const deleteStudentValidatore = [
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
      const idExists = await StudentService.checkStudentById(id);
      if (!idExists) {
        throw new Error('Student not found!');
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
    addRequestStudentValidator,
    updateStudentValidatore,
    deleteStudentValidatore
};
