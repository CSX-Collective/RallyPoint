const db = require('../database/database');
const logger = require('../logs/logger');

db.query(`create table if not exists "users" (
  _id serial primary key,
  email varchar(256),
  password varchar(256),
  first_name varchar(256),
  last_name varchar(256),
  dob date
)`, (err) => logger.error(err));

module.exports = db;
