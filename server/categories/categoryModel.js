const db = require('../database/database');
const logger = require('../logs/logger');

db.query(`create table if not exists "categories"(
  _id serial primary key,
  category varchar(256) not null,
  description varchar(256) not null
)`, (err) => {
  if (err){
    logger.error(err);
  }
});

module.exports = db;