const pg = require('pg');
const logger = require('../logs/logger');
const config = require('config');
const dbConfig = config.get('db');

const pool = new pg.Pool(dbConfig);

pool.connect((err, client, done) => {
  if (err) logger.error(err);

  logger.info('Successfully connected to database!');
});
