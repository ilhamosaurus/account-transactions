const { getBearerToken, decrypt } = require('../util/auth');

const verifyToken = async (req, res, next) => {
  const token = await getBearerToken(req);
  if (!token)
    return res.status(401).send({
      status: 108,
      message: 'Token tidak tidak valid atau kadaluwarsa',
    });
  try {
    const payload = await decrypt(token);
    req.userId = payload.user.id;
    req.email = payload.user.email;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 108,
      message: 'Token tidak tidak valid atau kadaluwarsa',
    });
  }
};

module.exports = { verifyToken };
