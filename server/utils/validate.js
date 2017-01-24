const Joi = require('joi');
const logger = require('../logs/logger');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

module.exports = {
  
  decryptPassword: (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword),

  encryptPassword: (password) => {
    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  validateSchema: (schema) => (req, res, next) => {
    Joi.validate(req.body, schema, (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).send('Invalid request body');
      }

      next();
    });
  },
};
