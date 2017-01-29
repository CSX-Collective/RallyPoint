import { expect } from 'chai';
import nock from 'nock';
import mockStore from './../fixtures/mockStore';
import {
  loginMockActionPayload1,
  loginMockActionPayload2,
  loginMockActionPayload3,
  loginActionSuccessFixture,
  loginActionFailureFixture1,
  loginActionFailureFixture2,
} from './../fixtures/ActionFixtures/loginActionFixtures';
import {
  forgotPasswordMockActionPayload1,
  forgotPasswordMockActionPayload2,
  forgotPasswordSuccessFixture,
  forgotPasswordFailureFixture,
} from './../fixtures/ActionFixtures/forgotPasswordActionFixtures';
import * as actions from '../../../../src/client/actions/index';
import * as types from '../../../../src/client/actions/ActionTypes';

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

    return mockStore.dispatch(actions.loginUser(loginMockActionPayload1))
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

    return mockStore.dispatch(actions.loginUser(loginMockActionPayload2))
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

    return mockStore.dispatch(actions.loginUser(loginMockActionPayload3))
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

    return mockStore.dispatch(actions.forgotPassword(forgotPasswordMockActionPayload1))
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

    return mockStore.dispatch(actions.forgotPassword(forgotPasswordMockActionPayload2))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(forgotPasswordFailureFixture);
      });
  });
});
