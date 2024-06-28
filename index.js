const express = require('express');
const serviceRouter = require('./src/routes/service');
const { registerValidator, loginValidator } = require('./src/validator/user');
const { register, login } = require('./src/services/user');
const profileRouter = require('./src/routes/profile');
const bannerRouter = require('./src/routes/banner');
const { verifyToken } = require('./src/middleware/auth');
const { getBalance, topupBalance } = require('./src/services/transaction');
const { topupValidator } = require('./src/validator/transaction');
const transactionRouter = require('./src/routes/transaction');
const { swaggerUi, specs } = require('./src/swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
