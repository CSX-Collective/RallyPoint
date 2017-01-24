import { expect } from 'chai';
import {
  initialUserStateFixture,
  userReducerRegisterMockAction,
  userReducerLoggedInFixture,
} from './../fixtures/ReducerFixtures/userReducerFixtures';
// import userReducer from '../../../../src/client/reducers/userReducer';

describe('Reducer: userReducer', () => {
  it('should return the initial state when no action is designated', () => {
    expect(userReducer(undefined, {}).to.equal(initialUserStateFixture));
  });

  it('should automatically log the user in upon successful user creation', () => {
    expect(userReducer(initialUserStateFixture, userReducerRegisterMockAction).to.equal(userReducerLoggedInFixture));
  });
});
