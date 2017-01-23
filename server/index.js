const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const logger = require('./logs/logger');
const userRoute = require('./users/userRoute');
const config = require('config');

// session handlers
const redis = require('redis');
const client = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const session_secret = config.get('session_secret');

client.on('error', (err) => logger.error(err));

app.use(session({
  store: new RedisStore({ client, ttl: 3600 }),
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
}));
app.use((req, res, next) => {
  if (!req.session) {
    return next(logger.error(err));
  }

  next();
});

app.use(cookieParser());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/client/index.html'));
});

app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.use('/users', userRoute);

app.all('*', function route404(req, res) {
  res.status(404).end();
});

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
