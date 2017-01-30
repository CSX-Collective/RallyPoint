// import * as types from '../../../../src/client/actions/ActionTypes';

const loginMockAction1 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password123',
  },
};

const loginMockAction2 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password1',
  },
};

const loginMockAction3 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdo@example.com',
    password: 'password123',
  },
};

const loginActionSuccessFixture = [
  loginMockAction1,
  {
    type: types.LOGIN_USER_SUCCESS,
    status: 'success',
  },
];

const loginActionFailureFixture1 = [
  loginMockAction2,
  {
    type: types.LOGIN_USER_FAILURE,
    status: 'failure',
  },
];

const loginActionFailureFixture2 = [
  loginMockAction3,
  {
    type: types.LOGIN_USER_FAILURE,
    status: 'failure',
  },
];

module.exports = {
  loginMockAction1,
  loginMockAction2,
  loginMockAction3,
  loginActionSuccessFixture,
  loginActionFailureFixture1,
  loginActionFailureFixture2,
};
