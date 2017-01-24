const pg = require('pg');
const config = require('config');
const dbConfig = config.get('db');
const logger = require('../logs/logger');

const pool = new pg.Pool(dbConfig);

pool.connect((err) => {
  if (err) logger.error(err);

  logger.info('Successfully connected to database!');
});

module.exports = pool;
