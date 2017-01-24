const db = require('../database/database');
const logger = require('../logs/logger');

db.query(`create table if not exists "users" (
  _id serial primary key,
  email varchar(256) unique not null,
  password varchar(256) not null,
  first_name varchar(256) not null,
  last_name varchar(256) not null,
  dob date not null
)`, (err) => {
  if (err) logger.error(err);
});

module.exports = db;
