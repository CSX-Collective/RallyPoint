// import * as types from '../../../../src/client/actions/ActionTypes';

const registerMockAction = {
  type: types.REGISTER_USER_REQUEST,
  body: {
    _id: 123,
    name: 'John Doe',
    email: 'jdoe@example.com',
    username: 'jaydee',
    password: 'password123',
    passwordconfirmation: 'password123',
  },
};

const registerActionSuccessFixture = [
  registerMockAction,
  {
    type: types.REGISTER_USER_SUCCESS,
    status: 'success',
  },
];

const registerActionFailureFixture = [
  registerMockAction,
  {
    type: types.REGISTER_USER_FAILURE,
    status: 'failure',
  },
];

module.exports = {
  registerMockAction,
  registerActionSuccessFixture,
  registerActionFailureFixture,
};
