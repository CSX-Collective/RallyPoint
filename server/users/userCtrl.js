const db = require('./userModel');
const logger = require('../logs/logger');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

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
    db.query(`delete from users where _id= ${req.params.user_id}`, (err) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },

  getUserById: (req, res, next) => {
    db.query(`select * from users where _id= ${req.params.user_id} limit 1`, (err, user) => {
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
    db.query(`select * from users where email= '${req.body.email}' limit 1`, (err, user) => {
      if (err) logger.error(err);

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
    query = query.replace(/,\s*$/, '') + ` where _id= ${req.params.user_id}`;

    db.query(query, (err) => {
      if (err) logger.error(err);

      return res.status(204).end();
    });
  },
};

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const decryptPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = userCtrl;
