const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const EXPRESSPORT = 8080;

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', function routeHome(req, res) {
  res.status(200).send(`Welcome to RallyPoint API Gateway!`);
});

app.all('*', function route404(req, res) {
  res.status(404).end();
});

app.listen(EXPRESSPORT, function appListenSuccess() {
  console.log(`Server started successfully. Listening on port ${EXPRESSPORT}`);
});