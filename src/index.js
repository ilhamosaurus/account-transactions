const express = require('express');
const serviceRouter = require('./routes/service');
const { registerValidator, loginValidator } = require('./validator/user');
const { register, login } = require('./services/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/services', serviceRouter);
app.post('/register', registerValidator, register);
app.post('/login', loginValidator, login);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
