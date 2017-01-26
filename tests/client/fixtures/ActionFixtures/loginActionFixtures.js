// import * as types from '../../../../src/client/actions/ActionTypes';

const loginMockActionPayload1 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password123',
  },
};

const loginMockActionPayload2 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password1',
  },
};

const loginMockActionPayload3 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdo@example.com',
    password: 'password123',
  },
};

const loginActionSuccessFixture = [
  {
    type: types.LOGIN_USER_REQUEST,
    body: {
      email: 'jdoe@example.com',
      password: 'password123',
    },
  },
  {
    type: types.LOGIN_USER_SUCCESS,
    status: 'success',
  },
];

const loginActionFailureFixture1 = [
  {
    type: types.LOGIN_USER_REQUEST,
    body: {
      email: 'jdoe@example.com',
      password: 'password1',
    },
  },
  {
    type: types.LOGIN_USER_FAILURE,
    status: 'failure',
  },
];

const loginActionFailureFixture2 = [
  {
    type: types.LOGIN_USER_REQUEST,
    body: {
      email: 'jdo@example.com',
      password: 'password123',
    },
  },
  {
    type: types.LOGIN_USER_FAILURE,
    status: 'failure',
  },
];

module.exports = {
  loginMockActionPayload1,
  loginMockActionPayload2,
  loginMockActionPayload3,
  loginActionSuccessFixture,
  loginActionFailureFixture1,
  loginActionFailureFixture2,
};
