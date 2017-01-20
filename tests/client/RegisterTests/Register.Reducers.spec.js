import { expect } from 'chai';
import userReducer from './../fixtures/RegisterFixtures/registerReducerFixtures';
import {
  initialStateFixture,
  registerReducerMockAction,
  registerReducerSuccessFixture,
} from './../fixtures/RegisterFixtures/registerActionFixtures';

describe('Reducer: userReducer', () => {
  it('should return the initial state when no action is designated', () => {
    expect(userReducer(undefined, {}).to.equal(initialStateFixture));
  });

  it('should automatically log the user in upon successful user creation', () => {
    expect(userReducer(initialStateFixture, registerReducerMockAction).to.equal(registerReducerSuccessFixture));
  });
});
