const db = require('../lib/db');

const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
      select: {
        email: true,
        first_name: true,
        last_name: true,
        id: true,
        password: true,
        image: true,
      },
    });
    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUserByEmail };
