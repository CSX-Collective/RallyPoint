const db = require('./eventModel');
const logger = require('../logs/logger');

const eventCtrl = {
  createEvent: (req, res) => {
    const { title, desc, start, end, location, min_age, category } = req.body;

    db.query(`INSERT INTO events (events, desc, start, end location, min_age, category) VALUES (${title}, ${desc}, ${start}, ${end}, ${location}, ${min_age}, ${category})`, (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(201).end();
    });
  },
  deleteEvent: (req, res) => { },
  updateEvent: (req, res) => { },
  getEventById: (req, res) => { },
  getEvents: (req, res) => { },
}