import { expect } from 'chai';
import {
  initialUserStateFixture,
  userReducerLoginMockAction1,
  userReducerLoginMockAction2,
  userReducerLoginMockAction3,
  userReducerLoggedInFixture,
} from './../fixtures/ReducerFixtures/userReducerFixtures';
// import userReducer from '../../../../src/client/reducers/userReducer';

describe('Reducer: userReducer', () => {
  it('should log the user in upon successful login', () => {
    expect(userReducer(initialUserStateFixture, userReducerLoginMockAction1).to.equal(userReducerLoggedInFixture));
  });

  it('should not login the user in due to wrong password', () => {
    expect(userReducer(initialUserStateFixture, userReducerLoginMockAction2).to.equal(initialUserStateFixture));
  });

  it('should not login the user in due to the email address not being found in the db', () => {
    expect(userReducer(initialUserStateFixture, userReducerLoginMockAction3).to.equal(initialUserStateFixture));
  });
});
