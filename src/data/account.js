const db = require('../lib/db');

const getAccountByUserId = async (userId) => {
  try {
    const account = await db.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) return null;

    return account;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAccountByUserId,
};
