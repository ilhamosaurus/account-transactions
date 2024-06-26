const { check } = require('express-validator');

const registerValidator = [
  check('email', 'Parameter email tidak sesuai format')
    .isEmail()
    .notEmpty()
    .trim()
    .normalizeEmail(),
  check('password', 'Password minimal 8 karakter')
    .isLength({ min: 8 })
    .notEmpty()
    .trim(),
  check('first_name', 'First name minimal 3 karakter')
    .isLength({ min: 3 })
    .notEmpty()
    .trim(),
  check('last_name', 'Last name minimal 3 karakter')
    .isLength({ min: 3 })
    .notEmpty()
    .trim(),
];

const loginValidator = [
  check('email', 'Parameter email tidak sesuai format')
    .isEmail()
    .notEmpty()
    .trim()
    .normalizeEmail(),
  check('password', 'Password minimal 8 karakter')
    .isLength({ min: 8 })
    .notEmpty()
    .trim(),
];

module.exports = { registerValidator, loginValidator };
