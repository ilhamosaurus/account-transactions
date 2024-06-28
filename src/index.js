const express = require('express');
const serviceRouter = require('./routes/service');
const { registerValidator, loginValidator } = require('./validator/user');
const { register, login } = require('./services/user');
const profileRouter = require('./routes/profile');
const bannerRouter = require('./routes/banner');
const { verifyToken } = require('./middleware/auth');
const { getBalance, topupBalance } = require('./services/transaction');
const { topupValidator } = require('./validator/transaction');
const transactionRouter = require('./routes/transaction');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/register', registerValidator, register);
app.post('/login', loginValidator, login);
app.use('/profile', profileRouter);
app.use('/banner', bannerRouter);
app.use('/services', serviceRouter);
app.get('/balance', verifyToken, getBalance);
app.post('/topup', verifyToken, topupValidator, topupBalance);
app.use('/transaction', transactionRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
