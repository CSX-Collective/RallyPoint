const expect = require('chai').expect;
const supertest = require('supertest-as-promised');
const faker = require('faker');
const db = require('../../../server/database/database');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:8080');

describe('GET /users', () => {

  beforeEach((done) => {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (1, 'test@xyz.io', 'shoess231', 'Tony', 'Tiger', '2017-10-1')`, (err) => {
      if (err) done(err);
    });
    done();
  });

  it('Should get all users', (done) => {
    server
    .get('/users')
    .expect(200)
    .end(done);
  });

  it ('Should fetch user', (done) => {
    server
    .get('/users/1')
    .expect(200)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body._id).to.eql(1);
      expect(res.body.email).to.eql('test@xyz.io');
      done();
    });
  });

  it ('Should return nothing when fetching nonexistent user', (done) => {
    server
    .get('/users/3000')
    .expect(200)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.eql({});
      done();
    });
  });
});

describe('DELETE /users', () => {

  beforeEach((done) => {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (1, 'test@xyz.io', 'shoess231', 'Tony', 'Tiger', '2017-10-1')`, (err) => {
      if (err) logger.error(err);
    });
    done();
  });

  it ('Should delete user', (done) => {
    server
    .delete('/users/1')
    .expect(204)
    .end(done);
  });

  it ('Should handle delete of nonexistent user', (done) => {
    server
    .delete('/users/24000')
    .expect(204)
    .end(done);
  });
}); 

describe('PATCH /users', () => {

  beforeEach((done) => {
    db.query(`delete from users; insert into users (_id, email, password, first_name, last_name, dob) values (1, 'test@xyz.io', 'shoess231', 'Tony', 'Tiger', '2017-10-1')`, (err) => {
      if (err) logger.error(err);
    });
    done();
  });

  it ('Should update user\'s email', (done) => {
    server
    .patch('/users/1')
    .send({ email: 'hacker@aim.com' })
    .expect(204)
    .end((err, res) => {
      if (err) done(err);

      db.query(`select * from users where _id= 1`, (err, user) => {
        if (err) done(err);

        expect(user.rows[0].email).to.eql('hacker@aim.com');
        done();
      });
    });
  });

  it ('Should send error response with invalid request body', (done) => {
    server
    .patch('/users/1')
    .send({ key: 'confidential' })
    .expect(400)
    .end(done);
  });

  it ('Should handle update of nonexistent user', (done) => {
    server
    .patch('/users/8888888')
    .send({ email: 'faker@hi.com' })
    .expect(204)
    .end(done);
  });
});

describe('POST /users', () => {
 
  it ('Should create user', (done) => {
    server
    .post('/users')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      dob: new Date("August 28, 2016 11:00:00"),
    })
    .expect(201)
    .end(done);
  });

  it ('Should send error response with invalid request body', (done) => {
    server
    .post('/users')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      last_name: faker.name.lastName(),
    })
    .expect(400)
    .end(done);
  });
}); 
