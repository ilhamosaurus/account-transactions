const { getAccountByUserId } = require('../data/account');
const db = require('../lib/db');

const getInvNumber = async (userId) => {
  const account = await getAccountByUserId(userId);
  if (!account) return null;

  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate()}T00:00:00Z`;
  const transactionNumber = await db.transaction.count({
    where: {
      accountId: account.id,
      created_on: {
        gte: date,
      },
    },
  });

  const invDate = today.toJSON().slice(0, 10).split('-').reverse().join('');
  const invNumber = `INV${invDate}-${(transactionNumber + 1)
    .toString()
    .padStart(3, '0')}`;

  return invNumber;
};

module.exports = getInvNumber;
