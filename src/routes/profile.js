const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  updateImage,
} = require('../services/profile');
const { editProfileValidator } = require('../validator/user');
const upload = require('../util/multer');
const db = require('../lib/db');
require('dotenv').config();
const profileRouter = express.Router();

profileRouter.get('/', verifyToken, getProfile);
profileRouter.put('/update', verifyToken, editProfileValidator, updateProfile);
profileRouter.put('/image', verifyToken, upload.single('file'), updateImage);

module.exports = profileRouter;
