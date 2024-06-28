const { check } = require('express-validator');
const { getServiceCodes } = require('../data/service');

const topupValidator = [
  check('top_up_amount', 'Nilai top up harus dengan angak positif')
    .notEmpty({ ignore_whitespace: true })
    .isInt({ gt: 0 }),
];

const paymentValidator = [
  check('service_code', 'Service code tidak di temukan')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ min: 2 })
    .trim(),
];

module.exports = { topupValidator, paymentValidator };
