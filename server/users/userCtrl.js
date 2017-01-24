const db = require('./userModel');
const logger = require('../logs/logger');
const { decryptPassword, encryptPassword } = require('../utils/validate');

const userCtrl = {

  createUser: (req, res, next) => {
    const user = req.body;
    const password = encryptPassword(user.password);
 
    db.query(`insert into users (email, password, first_name, last_name, dob) values ($1, $2, $3, $4, $5)`, [user.email, password, user.first_name, user.last_name, user.dob], (err) => {
      if (err) logger.error(err);

      req.session.key = user.email;
      return res.status(201).end();
    });
  },

  deleteUser: (req, res, next) => {
    db.query(`delete from users where _id= $1`, [req.params.user_id], (err) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },

  getUserById: (req, res, next) => {
    db.query(`select * from users where _id= $1 limit 1`, [req.params.user_id], (err, user) => {
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

  loginUser: (req, res, next) => {
    db.query(`select * from users where email= $1 limit 1`, [req.body.email], (err, user) => {
      if (err) logger.error(err);

      // no user found by that email
      if (!user.rows[0]) return res.status(401).end();

      const password = user.rows[0].password;

      if (decryptPassword(req.body.password, password)) {
        req.session.key = req.body.email;
        // eventually redirect to home
        return res.status(201).end();
      } else {
        // passwords don't match
        return res.status(401).end();
      }
    });
  },

  updateUser: (req, res, next) => {
    const user = req.body;
    const fields = Object.keys(user);
    let query = 'update users set ';

    fields.forEach((field) => {
      // set the value of the column for each field in the request body
      query += `${field} = '${user[field]}', `;
    });

    // get rid of last comma before setting predicates
    query = query.replace(/,\s*$/, '') + ` where _id= $1`;

    db.query(query, [req.params.user_id], (err) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },
};

module.exports = userCtrl;
