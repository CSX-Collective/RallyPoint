import { expect } from 'chai';
import nock from 'nock';
import mockStore from './../fixtures/mockStore';
import {
  loginMockAction1,
  loginMockAction2,
  loginMockAction3,
  loginActionSuccessFixture,
  loginActionFailureFixture1,
  loginActionFailureFixture2,
} from './../fixtures/ActionFixtures/loginActionFixtures';
import {
  forgotPasswordMockAction1,
  forgotPasswordMockAction2,
  forgotPasswordSuccessFixture,
  forgotPasswordFailureFixture,
} from './../fixtures/ActionFixtures/forgotPasswordActionFixtures';
import * as actions from '../../../../src/client/actions/index';

describe('Action Creator: loginUser', () => {
  after(() => {
    nock.cleanAll();
  });

  it('dispatches LOGIN_USER_SUCCESS action type when post request successfully completes', () => {
    nock('http://example.com')
      .post('/login', {
        email: 'jdoe@example.com',
        password: 'password123',
      })
      .reply('201', { status: 'success' });

    return mockStore.dispatch(actions.loginUser(loginMockAction1))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(loginActionSuccessFixture);
      });
  });

  it('dispatches LOGIN_USER_FAILURE action type when post request fails due to wrong password', () => {
    nock('http://example.com')
      .post('/login', {
        email: 'jdoe@example.com',
        password: 'password1',
      })
      .reply('401', { status: 'failure' });

    return mockStore.dispatch(actions.loginUser(loginMockAction2))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(loginActionFailureFixture1);
      });
  });

  it('dispatches LOGIN_USER_FAILURE action type when post request fails due to the email address not being found in the db', () => {
    nock('http://example.com')
      .post('/login', {
        email: 'jdo@example.com',
        password: 'password123',
      })
      .reply('401', { status: 'failure' });

    return mockStore.dispatch(actions.loginUser(loginMockAction3))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(loginActionFailureFixture2);
      });
  });

});

describe('Action Creator: forgotPassword', () => {
  after(() => {
    nock.cleanAll();
  });

  it('dispatches FORGOT_PASSWORD_SUCCESS action type when post request successfully completes', () => {
    nock('http://example.com')
      .post('/forgotPassword', {
        email: 'jdoe@example.com',
      })
      .reply('201', { status: 'success' });

    return mockStore.dispatch(actions.forgotPassword(forgotPasswordMockAction1))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(forgotPasswordSuccessFixture);
      });
  });

  it('dispatches FORGOT_PASSWORD_FAILURE action type when post request fails due to no email address found in db', () => {
    nock('http://example.com')
      .post('/forgotPassword', {
        email: 'jdo@example.com',
      })
      .reply('401', { status: 'failure' });

    return mockStore.dispatch(actions.forgotPassword(forgotPasswordMockAction2))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(forgotPasswordFailureFixture);
      });
  });
});
