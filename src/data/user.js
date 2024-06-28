const db = require('../lib/db');

const getUserByEmail = async (email) => {
  try {
    const user = await db.$queryRaw`
      SELECT id, email, first_name, last_name, password, image
      FROM users
      WHERE email = ${email}`;

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUserByEmail };
