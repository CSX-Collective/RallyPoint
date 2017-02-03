const db = require('./eventModel');
const logger = require('../logs/logger');

const eventCtrl = {
  createEvent: (req, res) => {
    const event = req.body;

    db.query('insert into events (events, event_desc, start_date, end_date location, min_age, category) values (default, $1, $2, $3, $4, $5, $6, $7)', [event.title, event.event_desc, event.start_date, event.end_date, event.location, event.min_age, event.category], (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).end();
      }

      return res.status(201).end();
    });

  },
  // deleteEvent: (req, res) => { },
  // updateEvent: (req, res) => { },
  // getEventById: (req, res) => { },
  // getEvents: (req, res) => { },
};
