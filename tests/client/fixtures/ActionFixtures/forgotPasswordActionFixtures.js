// import * as types from '../../../../src/client/actions/ActionTypes';

const forgotPasswordMockAction1 = {
  type: types.FORGOT_PASSWORD_REQUEST,
  body: {
    email: 'jdoe@example.com',
  },
};

const forgotPasswordMockAction2 = {
  type: types.FORGOT_PASSWORD_REQUEST,
  body: {
    email: 'jdo@example.com',
  },
};

const forgotPasswordSuccessFixture = [
  forgotPasswordMockAction1,
  {
    type: types.FORGOT_PASSWORD_SUCCESS,
    status: 'success',
  },
];

const forgotPasswordFailureFixture = [
  forgotPasswordMockAction2,
  {
    type: types.FORGOT_PASSWORD_FAILURE,
    status: 'failure',
  },
];

module.exports = {
  forgotPasswordMockAction1,
  forgotPasswordMockAction2,
  forgotPasswordSuccessFixture,
  forgotPasswordFailureFixture,
};
