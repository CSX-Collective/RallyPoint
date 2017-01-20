import { expect } from 'chai';
import nock from 'nock';
import mockStore from './../fixtures/mockStore';
import { registerActionFixtures, mockRegisterActionPayload } from './../fixtures/expectedRegisterActions';
// import * as actions from '../../../../src/client/actions/index';
// import * as types from '../../../../src/client/actions/ActionTypes';

describe('Register Action Creators', () => {
  afterEach(() => {
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

    return mockStore.dispatch(actions.registerUser(mockRegisterActionPayload))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(registerActionFixtures);
      });
  });
});
