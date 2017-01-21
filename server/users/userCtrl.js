const db = require('./userModel');
const logger = require('../logs/logger');

const userCtrl = {
  getUsers: (req, res, next) => {
    db.query('select * from users', (err, users) => {
      if (err) logger.error(err);

      return res.status(200).send(users.rows);
    });
  },
};

module.exports = userCtrl;
