const express = require('express');
const { getAllServices } = require('../services/service');
const { verifyToken } = require('../middleware/auth');
const serviceRouter = express.Router();

serviceRouter.get('/', verifyToken, getAllServices);

module.exports = serviceRouter;
