const express = require('express');
const { getAllServices } = require('../services/service');
const serviceRouter = express.Router();

serviceRouter.get('/', getAllServices);

module.exports = serviceRouter;
