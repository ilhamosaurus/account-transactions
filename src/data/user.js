const db = require('../lib/db');

const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({ where: { email: email } });
    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUserByEmail };
