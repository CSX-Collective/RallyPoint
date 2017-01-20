const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const EXPRESSPORT = 8080;

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/bundle.js'));
});

app.all('*', function route404(req, res) {
  res.status(404).end();
});

app.listen(EXPRESSPORT, function appListenSuccess() {
  console.log(`Server started successfully. Listening on port ${EXPRESSPORT}`);
});
