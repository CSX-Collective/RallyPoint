// import userReducer from '../../../../src/client/reducers/userReducer';
// import * as types from '../../../../src/client/actions/ActionTypes';

const initialUserStateFixture = {
  _id: 1,
  name: '',
  email: '',
  username: '',
  coords: { lat: 0, lng: 0 },
  isPending: false, // When true, this flag indicates that the browser should display a spinner
  isLoggedIn: false,
};

const userReducerLoggedInFixture = {
  _id: 123,
  name: 'John Doe',
  email: 'jdoe@example.com',
  username: 'jaydee',
  coords: {
    lat: 34.053,
    lng: -118.242,
  },
  isPending: false,
  isLoggedIn: true,
};

module.exports = {
  initialUserStateFixture,
  userReducerLoggedInFixture,
};
