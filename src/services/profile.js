const { validationResult } = require('express-validator');
const { getUserByEmail } = require('../data/user');
require('dotenv').config();
const db = require('../lib/db');

const getProfile = async (req, res) => {
  const email = req.email;

  try {
    const user = (await getUserByEmail(email))[0];
    if (!user) {
      return res.status(404).send({ status: 103, message: 'User not found' });
    }

    const { password, id, ...rest } = user;

    return res.status(200).send({ status: 0, message: 'Sukses', data: rest });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 101, message: `Failed to get profile: ${error}` });
  }
};

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: 102,
      message: errors.array().map((e) => e.msg),
      data: null,
    });
  }

  const { first_name, last_name } = req.body;
  const email = req.email;

  try {
    const updatedProfile = await db.$executeRaw`
      UPDATE users
      SET first_name = ${first_name}, last_name = ${last_name}
      WHERE email = ${email}
      RETURNING email, first_name, last_name, image`;

    if (updatedProfile !== 1) {
      return res.status(404).send({
        status: 103,
        message: 'User not found',
        data: null,
      });
    }

    return res.status(200).send({
      status: 0,
      message: 'Update Profile berhasil',
      data: {
        first_name,
        last_name,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: `Failed to update profile: ${error}` });
  }
};

const updateImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  if (req.file.mimetype !== 'image/jpeg') {
    return res.status(400).send({
      status: 102,
      message: 'Format Image tidak sesuai',
      data: null,
    });
  }
  if (req.file.size > 2048000) {
    return res
      .status(400)
      .send({ status: 102, message: 'File terlalu besar', data: null });
  }

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const imageUrl = `${baseUrl}/${req.file.filename}`;
  const email = req.email;

  try {
    const updatedProfile = await db.user.update({
      where: { email },
      data: {
        image: imageUrl,
      },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        image: true,
      },
    });

    res.status(201).send({
      status: 0,
      message: 'Update profile image berhasil',
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: `Failed to update profile image: ${error}` });
  }
};

module.exports = { getProfile, updateProfile, updateImage };
