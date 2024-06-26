const express = require('express');
const serviceRouter = require('./routes/service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/services', serviceRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
