const db = require('../database/database');
const logger = require('../logs/logger');

db.query(`create table if not exists "users" (
  _id serial primary key,
  email varchar(256) unique,
  password varchar(256),
  first_name varchar(256),
  last_name varchar(256),
  dob date
)`, (err) => {
  if (err) logger.error(err);
});

module.exports = db;
