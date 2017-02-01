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

describe('POST /events/:event_id/comments', function() {
  it('should create comment', function(done) {
    server
    .post('/events/1/comments')
    .send({
      user_id,
      event_id,
      content: 'This is another message',
      created: Date.now(),
    })
    .expect(201)
    .end(function(err, res) {
      if (err) done(err);
      db.query('select * from comments where event_id= 1', (err, comment) => {
        if (err) done (err);

        expect(comment.rows).to.have.lengthOf(2);
        expect(user.rows[1]._id).to.exist;
        expect(user.rows[1].content).to.eql('This is another message');
      });
    });
  });

  it ('should send error response with invalid request body', function(done) {

    server
    .post('/events/1/comments')
    .send({
      user_id,
      event_id,
      created: Date.now(),
    })
    .expect(400)
    .end(function(err, res) {
      if (err) done(err);

      db.query('select * from comments where event_id= 1', (err, comments) => {
        if (err) done(err);

        expect(comments.rows).to.eql([]);
        done();
      });
    });
  });
});

describe('PATCH /events/:event_id/comments/:comment_id', function() {
  beforeEach(function(done) {
    db.query(`delete from comments; insert into comments (_id, user_id, event_id, content, created) values (${_id}, ${user_id}, ${event_id}, '${content}', '${created}')`, (err) => {
      if (err) done(err);
      done();
    });
  });

  it('should update comment\'s content', function(done) {
    server
    .patch('/events/1/comments/1')
    .send({ content: 'This message has been changed' })
    .expect(204)
    .end(function(err, res) {
      if (err) done(err);

      db.query('select * from comments where event_id= 1', (err, comments) => {
        if (err) done (err);

        expect(comments.rows[0].content).to.eql('This message has been changed');
        done();
      });
    });
  });

  it('should send error response with invalid request body', function(done) {
    server
    .patch('/events/1/comments/1')
    .send( { message: 'Message' })
    .expect(400)
    .end(function(err, res) {
      if (err) done(err);

      db.query('select * from comments where event_id= 1', (err, comments) => {
        if (err) done(err);

        expect(comments.rows[0]).to.exist;
        expect(comments.rows[0].message).to.not.exist;
        done();
      });
    });
  });

  it('should handle update of nonexistent comment', function(done) {
    server
    .patch('/events/1/comments/4')
    .send({ content: 'This message should not exist' })
    .expect(204)
    .end(done);
  });
});

describe('DELETE /events/:event_id/comments/:comment_id', function(done) {
  beforeEach(function(done) {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (${_id}, '${email}', '${password}', '${first_name}', '${last_name}', '${dob}')`, (err) => {
      if (err) done(err);
      done();
    });
  });
  
  it('should delete a comment', function(done) {
    server
    .delete('/events/1/comments/1')
    .expect(204)
    .end(function(err, res) {
      if (err) done(err);
      db.query(`select * from comments where event_id= 1`, (err, event) {
        if (err) done(err);

        expect(event.rows).to.eql([]);
        done();
      });
    });
  });

  it('should handle delete of nonexistent comment', function(done) {
    server
    .delete('/events/1/comments/10')
    .expect(204)
    .end(function(err, res) {
      if (err) done(err);

      db.query(`select * from comments where event_id= 1`, (err, event) => {
        if (err) done(err);

        expect(event.rows).to.have.lengthOf(1);
        done();
      });
    });
  }); 
});