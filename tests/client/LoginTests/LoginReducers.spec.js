import { expect } from 'chai';
import {
  loginMockAction1,
  loginMockAction2,
  loginMockAction3,
} from './../fixtures/ActionFixtures/loginActionFixtures';
import {
  initialUserStateFixture,
  userReducerLoggedInFixture,
} from './../fixtures/ReducerFixtures/userReducerFixtures';
// import userReducer from '../../../../src/client/reducers/userReducer';

describe('Reducer: userReducer', () => {
  it('should log the user in upon successful login', () => {
    expect(userReducer(initialUserStateFixture, loginMockAction1).to.equal(userReducerLoggedInFixture));
  });

  it('should not login the user in due to wrong password', () => {
    expect(userReducer(initialUserStateFixture, loginMockAction2).to.equal(initialUserStateFixture));
  });

  it('should not login the user in due to the email address not being found in the db', () => {
    expect(userReducer(initialUserStateFixture, loginMockAction3).to.equal(initialUserStateFixture));
  });
});
