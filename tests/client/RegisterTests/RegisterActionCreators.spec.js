import { expect } from 'chai';
import nock from 'nock';
import mockStore from './../fixtures/mockStore';
import {
  registerActionSuccessFixtures,
  registerActionFailureFixtures,
  registerMockActionPayload,
} from './../fixtures/RegisterFixtures/registerActionFixtures';
// import * as actions from '../../../../src/client/actions/index';
// import * as types from '../../../../src/client/actions/ActionTypes';

describe('Action Creator: registerUser', () => {
  after(() => {
    nock.cleanAll();
  });

  it('dispatches REGISTER_USER_SUCCESS action type when post request successfully completes', () => {
    nock('http://example.com')
      .post('/register', {
        name: 'John Doe',
        email: 'jdoe@example.com',
        username: 'jaydee',
        password: 'password123',
        passwordconfirmation: 'password123',
      })
      .reply('201', { status: 'success' });

    return mockStore.dispatch(actions.registerUser(registerMockActionPayload))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(registerActionSuccessFixtures);
      });
  });

  it('dispatches REGISTER_USER_FAILURE action type when post request fails due to pre-existing resource in db', () => {
    nock('http://example.com')
      .post('/register', {
        name: 'John Doe',
        email: 'jdoe@example.com',
        username: 'jaydee',
        password: 'password123',
        passwordconfirmation: 'password123',
      })
      .reply('409', { status: 'failure' });

    return mockStore.dispatch(actions.registerUser(registerMockActionPayload))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(registerActionFailureFixtures);
      });
  });
});
