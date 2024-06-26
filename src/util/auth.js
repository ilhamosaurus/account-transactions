const jose = require('jose');
require('dotenv').config();

const secret = process.env.SECRET;
const key = new TextEncoder().encode(secret);

const encrypt = async (payload) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12 hrs')
    .sign(key);
};

const generateToken = async (id, email, first_name, last_name) => {
  const user = { id, email, first_name, last_name };
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 12);

  const token = await encrypt({ user, expires });

  return token;
};

const decrypt = async (token) => {
  const { payload } = await jose.jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
};

const getBearerToken = async (req) => {
  const header = req.headers['Authorization'];
  if (!header) return null;
  const [type, token] = header.split(' ');
  if (type !== 'Bearer') return null;
  return token;
};

module.exports = { generateToken, decrypt, getBearerToken };
