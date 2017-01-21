const db = require('./userModel');
const logger = require('../logs/logger');

const userCtrl = {
  
  createUser: (req, res, next) => {
    const user = req.body;
 
    db.query(`insert into users (email, password, first_name, last_name, dob) values ($1, $2, $3, $4, $5)`, [user.email, user.password, user.first_name, user.last_name, user.dob], (err, user) => {
      if (err) logger.error(err);

      return res.status(201).send(user);
    });
  },

  getUsers: (req, res, next) => {
    db.query('select * from users', (err, users) => {
      if (err) logger.error(err);

      return res.status(200).send(users.rows);
    });
  },
};

module.exports = userCtrl;
