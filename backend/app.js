const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('FlexiWork API is running');
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});