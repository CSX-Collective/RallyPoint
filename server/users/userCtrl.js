const db = require('./userModel');
const logger = require('../logs/logger');

const userCtrl = {

  createUser: (req, res, next) => {
    const user = req.body;
 
    db.query(`insert into users (email, password, first_name, last_name, dob) values ($1, $2, $3, $4, $5)`, [user.email, user.password, user.first_name, user.last_name, user.dob], (err, user) => {
      if (err) logger.error(err);

      return res.status(201).end();
    });
  },

  deleteUser: (req, res, next) => {
    db.query(`delete from users where _id= ${req.params.user_id}`, (err, user) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },

  getUserById: (req, res, next) => {
    db.query(`select * from users where _id= ${req.params.user_id}`, (err, user) => {
      if (err) logger.error(err);

      return res.status(200).send(user.rows[0]);
    });
  }, 

  getUsers: (req, res, next) => {
    db.query('select * from users', (err, users) => {
      if (err) logger.error(err);

      return res.status(200).send(users.rows);
    });
  },

  updateUser: (req, res, next) => {
    let query = 'update users set ';
    const fields = Object.keys(req.body);

    fields.forEach((field) => {
      // set the value of the column for each field in the request body
      query += `${field} = '${req.body[field]}', `;
    });

    // get rid of last comma before setting predicates
    query = query.replace(/,\s*$/, '') + ` where _id= ${req.params.user_id}`;

    db.query(query, (err, user) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },
};

module.exports = userCtrl;
