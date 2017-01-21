const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./logs/logger');
const db = require('./database/database');

const app = express();

const PORT = 8080;

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/client/index.html'));
});

app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.all('*', function route404(req, res) {
  res.status(404).end();
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
