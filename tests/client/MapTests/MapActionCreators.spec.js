import { expect } from 'chai';
import nock from 'nock';
import mockStore from './../fixtures/mockStore';
import {
  fetchEventsMockAction1,
  fetchEventsMockAction2,
  fetchEventsMockAction3,
  fetchEventsResultsFixture,
  fetchEventsSuccessFixture,
  fetchEventsFailureFixture1,
  fetchEventsFailureFixture2,
} from './../fixtures/ActionFixtures/mapActionFixtures';
// import * as actions from '../../../../src/client/actions/index';
// import * as types from '../../../../src/client/actions/ActionTypes';

describe('Action Creator: fetchEvents', () => {
  after(() => {
    nock.cleanAll();
  });

  it('dispatches FETCH_EVENTS_SUCCESS action type when get request successfully completes', () => {
    nock('http://example.com')
      .get('/events')
      .query({
        coords: {
          lat: 34.053,
          lng: -118.242,
        },
        range: 10,
      })
      .reply(200, { status: 'success', results: fetchEventsResultsFixture });

    return mockStore.dispatch(actions.fetchEvents(fetchEventsMockAction1))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(fetchEventsSuccessFixture);
      });
  });

  it('dispatches FETCH_EVENTS_FAILURE action type when get request fails to complete because no events are nearby', () => {
    nock('http://example.com')
      .get('/events')
      .query({
        coords: {
          lat: -82.862,
          lng: 135,
        },
        range: 10,
      })
      .reply(404, { status: 'failure', results: [] });

    return mockStore.dispatch(actions.fetchEvents(fetchEventsMockAction2))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(fetchEventsFailureFixture1);
      });
  });

  it('dispatches FETCH_EVENTS_FAILURE action type when get request fails to complete because range is less than or equal to 0', () => {
    nock('http://example.com')
      .get('/events')
      .query({
        coords: {
          lat: 34.053,
          lng: -118.242,
        },
        range: 0,
      })
      .reply(404, { status: 'failure', results: [] });

    return mockStore.dispatch(actions.fetchEvents(fetchEventsMockAction3))
      .then(() => {
        expect(mockStore.getActions()).to.be.equal.to(fetchEventsFailureFixture2);
      });
  });
});

describe('Action Creator: selectEvent', () => {
  it('dispatches SELECT_EVENT action type with coords as Action', () => {
    const coords = {
      lat: 34.053,
      lng: -118.242,
    };
    const expectedAction = {
      type: types.SELECT_EVENT,
      coords: {
        lat: 34.053,
        lng: -118.242,
      },
    };
    expect(actions.selectEvent(coords).to.be.equal.to(expectedAction));
  });
});
