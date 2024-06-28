const { getAccountByUserId } = require('../data/account');
const db = require('../lib/db');

const getInvNumber = async (userId) => {
  const account = await getAccountByUserId(userId);
  if (!account) return null;

  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${today.getDate()}T00:00:00Z`;
  const transactionNumber = await db.$queryRaw`
    SELECT COUNT(*)::bigint AS count 
    FROM transactions
    WHERE account_id = ${account.id} AND created_on >= ${date}`;

  console.log('transactionNumber: ', Number(transactionNumber[0].count));
  const invDate = today.toJSON().slice(0, 10).split('-').reverse().join('');
  const invNumber = `INV${invDate}-${(Number(transactionNumber[0].count) + 1)
    .toString()
    .padStart(3, '0')}`;

  return invNumber;
};

module.exports = getInvNumber;
