// import userReducer from '../../../../src/client/reducers/userReducer';
// import * as types from '../../../../src/client/actions/ActionTypes';

const initialStateFixture = {
  name: '',
  email: '',
  username: '',
  isPending: false, // When true, this flag indicates that the browser should display a spinner
  isLoggedIn: false,
};

const registerReducerMockAction = {
  type: types.REGISTER_USER_REQUEST,
  body: {
    name: 'John Doe',
    email: 'jdoe@example.com',
    username: 'jaydee',
    password: 'password123',
    passwordconfirmation: 'password123',
  },
};

const registerReducerSuccessFixture = {
  name: 'John Doe',
  email: 'jdoe@example.com',
  username: 'jaydee',
  isPending: false,
  isLoggedIn: true,
};

module.exports = {
  initialStateFixture,
  registerReducerMockAction,
  registerReducerSuccessFixture,
};
