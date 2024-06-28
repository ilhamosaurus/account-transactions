const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { paymentValidator } = require('../validator/transaction');
const { payment, getTransactionHistory } = require('../services/transaction');
const transactionRouter = express.Router();

transactionRouter.post('/', verifyToken, paymentValidator, payment);
transactionRouter.get('/history', verifyToken, getTransactionHistory);

module.exports = transactionRouter;
