const express = require('express');
const { getAllBanners } = require('../services/banner');
const { verifyToken } = require('../middleware/auth');
const bannerRouter = express.Router();

bannerRouter.get('/', verifyToken, getAllBanners);

module.exports = bannerRouter;
