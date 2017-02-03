const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const config = require('config');
const logger = require('./logs/logger');
const userRoute = require('./users/userRoute');
const eventRoute = require('./events/eventRoute');

// session handlers
const redis = require('redis');
const client = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionSecret = config.get('session_secret');

client.on('error', (err) => logger.error(err));

app.use(session({
  store: new RedisStore({ client, ttl: 3600 }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('Redis connection lost.'));
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
app.use('/events', eventRoute);

app.all('*', (req, res) => {
  res.status(404).end();
});

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
