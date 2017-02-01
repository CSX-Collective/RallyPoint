const expect = require('chai').expect;
const supertest = require('supertest');
const db = require('../../../server/database/database');
const comment = require('../fixtures/commentFixtures');
const { _id, user_id, event_id, content, created } = comment;

const server = supertest.agent('http://localhost:8080');

describe ('GET /events/:event_id/comments', function() {

  beforeEach(function(done) {
    db.query(`delete from comments; insert into comments (_id, user_id, event_id, content, created) values (${_id}, ${user_id}, ${event_id}, '${content}', '${created}')`, (err) => {
      if (err) done(err);
      done();
    });
  });

  it('should get all comments from event', function(done) {
    server
    .get('/events/1/comments')
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);
      expect(res.body).to.exist;
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0])._id.to.eql(1);
      expect(res.body[0]).content.to.eql('This is a message');
      done();
    });
  });

  it('should return nothing when fetching comments from nonexistent event', function() {
    server
    .get('/events/2/comments')
    .expect(200)
    .end(function(err, res) {
      if (err) done (err);

      expect(res.body).to.exist;
      expect(res.body).to.eql({});
      done();
    });
  });
});

