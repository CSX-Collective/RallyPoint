// import * as types from '../../../../src/client/actions/ActionTypes';

const registerActionFixtures = [
  {
    type: types.REGISTER_USER_REQUEST,
    body: {
      name: 'John Doe',
      email: 'jdoe@example.com',
      username: 'jaydee',
      password: 'password123',
      passwordconfirmation: 'password123',
    },
  },
  {
    type: types.REGISTER_USER_SUCCESS,
    status: 'success',
  },
];

const mockRegisterActionPayload = {
  type: types.REGISTER_USER_REQUEST,
  body: {
    name: 'John Doe',
    email: 'jdoe@example.com',
    username: 'jaydee',
    password: 'password123',
    passwordconfirmation: 'password123',
  },
};

module.exports = { registerActionFixtures, mockRegisterActionPayload };
