const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { getUserByEmail } = require('../data/user');
const db = require('../lib/db');
const {
  PrismaClientKnownRequestError,
} = require('@prisma/client/runtime/library');
const { generateToken } = require('../util/auth');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: 102,
      message: errors.array().map((e) => e.msg),
      data: null,
    });
  }
  const { email, password, first_name, last_name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name,
          last_name,
        },
      });

      if (!user) {
        throw new Error('Failed to create user');
      }

      await tx.account.create({
        data: {
          userId: user.id,
          balance: 0,
        },
      });
    });

    return res.status(201).send({
      status: 0,
      message: 'Registrasi telah berhasil, silahkan login',
      data: null,
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(400).send({ error: 'Email already in use' });
    }
    console.error(error);
    return res.status(500).send({ error: `Failed to register user: ${error}` });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: 102,
      message: errors.array().map((e) => e.msg),
      data: null,
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const user = await getUserByEmail(email);
  if (!user) {
    return res
      .status(400)
      .send({ status: 103, message: 'Username atau password salah' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .send({ status: 103, message: 'Username atau password salah' });
  }

  try {
    const token = await generateToken(
      user.id,
      user.email,
      user.first_name,
      user.last_name
    );

    return res
      .status(200)
      .send({ status: 0, message: 'Login sukses', data: token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: `Failed to login user: ${error}` });
  }
};

module.exports = { register, login };
