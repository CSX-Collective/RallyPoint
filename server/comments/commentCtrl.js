const db = require('./commentModel');
const logger = require('../logs/logger');

const commentCtrl = {
  createComment: (req, res) => {
    const { event_id, user_id, content, created } = req.body;

    db.query(`INSERT INTO comments (event_id, user_id, content, created) VALUES (${event_id}, ${user_id}, ${content}, ${created})`, (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(201).end();
    });
  },
  deleteComment: (req, res) => {
    db.query('delete from comments where _id= $1', [req.params.comment_id], (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(204).end();
    });
  },
  updateComment: (req, res) => {
    const comment = req.body;
    const fields = Object.keys(comment);
    let query = 'update comments set ';

    fields.forEach((field) => {
      // set the value of the column for each field in the request body
      query += `${field} = '${user[field]}', `;
    });

    // get rid of last comma before setting predicates
    query = query.replace(/,\s*$/, '') + ' where _id= $1';

    db.query(query, [req.params.comment_id], (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(204).end();
    });
  },
  getComments: (req, res) => {
    db.query('select * from comments where event_id= $1', [req.params.event_id], (err, comments) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(200).send(comments.rows);
    });
  },
}

module.exports = commentCtrl;
