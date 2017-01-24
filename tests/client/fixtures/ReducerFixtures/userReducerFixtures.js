// import userReducer from '../../../../src/client/reducers/userReducer';
// import * as types from '../../../../src/client/actions/ActionTypes';

const initialUserStateFixture = {
  name: '',
  email: '',
  username: '',
  isPending: false, // When true, this flag indicates that the browser should display a spinner
  isLoggedIn: false,
};

const userReducerRegisterMockAction = {
  type: types.REGISTER_USER_REQUEST,
  body: {
    name: 'John Doe',
    email: 'jdoe@example.com',
    username: 'jaydee',
    password: 'password123',
    passwordconfirmation: 'password123',
  },
};

const userReducerLoginMockAction1 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password123',
  },
};

const userReducerLoginMockAction2 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdoe@example.com',
    password: 'password1',
  },
};

const userReducerLoginMockAction3 = {
  type: types.LOGIN_USER_REQUEST,
  body: {
    email: 'jdo@example.com',
    password: 'password123',
  },
};

const userReducerLoggedInFixture = {
  name: 'John Doe',
  email: 'jdoe@example.com',
  username: 'jaydee',
  isPending: false,
  isLoggedIn: true,
};

module.exports = {
  initialUserStateFixture,
  userReducerRegisterMockAction,
  userReducerLoginMockAction1,
  userReducerLoginMockAction2,
  userReducerLoginMockAction3,
  userReducerLoggedInFixture,
};
