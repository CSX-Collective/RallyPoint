import { expect } from 'chai';
import {
  eventFetchMockAction1,
  eventFetchMockAction2,
  eventSelectMockAction,
} from './../fixtures/ActionFixtures/mapActionFixtures';
import {
  initialEventStateFixture,
  eventReducerFetchFixture,
  eventReducerSelectFixture,
} from './../fixtures/ReducerFixtures/eventReducerFixtures';
// import eventReducer from '../../../../src/client/reducers/eventReducer';

describe('Reducer: eventReducer', () => {
  it('should populate the rallypoints array with event objects when component did mount/upon new events', () => {
    expect(eventReducer(initialEventStateFixture, eventFetchMockAction1).to.equal(eventReducerFetchFixture));
  });

  it('should not populate the rallypoints array when no events are found/coords are incorrect', () => {
    expect(eventReducer(initialEventStateFixture, eventFetchMockAction2).to.equal(initialEventStateFixture));
  });

  it('should merge the selectedRallypoint object into the store when an event is selected', () => {
    expect(eventReducer(eventReducerFetchFixture, eventSelectMockAction).to.equal(eventReducerSelectFixture));
  });
});
