const Joi = require('joi');
const logger = require('../logs/logger');

module.exports = (schema) => {
  return (req, res, next) => {
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        logger.error(err);
        return res.status(400).send('Invalid request body');
      }

      next();
    });
  };
};