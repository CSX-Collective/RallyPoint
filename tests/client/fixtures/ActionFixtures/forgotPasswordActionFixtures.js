// import * as types from '../../../../src/client/actions/ActionTypes';

const forgotPasswordMockActionPayload1 = {
  type: types.FORGOT_PASSWORD_REQUEST,
  body: {
    email: 'jdoe@example.com',
  },
};

const forgotPasswordMockActionPayload2 = {
  type: types.FORGOT_PASSWORD_REQUEST,
  body: {
    email: 'jdo@example.com',
  },
};

const forgotPasswordSuccessFixture = [
  {
    type: types.FORGOT_PASSWORD_REQUEST,
    body: {
      email: 'jdoe@example.com',
    },
  },
  {
    type: types.FORGOT_PASSWORD_SUCCESS,
    status: 'success',
  },
];

const forgotPasswordFailureFixture = [
  {
    type: types.FORGOT_PASSWORD_REQUEST,
    body: {
      email: 'jdo@example.com',
    },
  },
  {
    type: types.FORGOT_PASSWORD_FAILURE,
    status: 'failure',
  },
];

module.exports = {
  forgotPasswordMockActionPayload1,
  forgotPasswordMockActionPayload2,
  forgotPasswordSuccessFixture,
  forgotPasswordFailureFixture,
};
