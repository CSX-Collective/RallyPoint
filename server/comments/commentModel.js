const db = require('../database/database');
const logger = require('../logs/logger');

db.query(`create table if not exists "comments" (
  _id serial primary key,
  event_id varchar(256) not null,
  user_id varchar(256) not null,
  content varchar(256) not null,
  created date not null,
)`, (err) => {
  if (err) logger.error(err);
});

module.exports = db;