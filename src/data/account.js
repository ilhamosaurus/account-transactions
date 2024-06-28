const db = require('../lib/db');

const getAccountByUserId = async (userId) => {
  try {
    const account = await db.$queryRaw`
      SELECT * FROM accounts
      WHERE user_id = ${userId}`;

    if (!account) return null;

    return account[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAccountByUserId,
};
