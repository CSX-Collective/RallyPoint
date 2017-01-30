// import eventReducer from '../../../../src/client/reducers/eventReducer';
// import * as types from '../../../../src/client/actions/ActionTypes';
import fetchEventsResultsFixture from './../ActionFixtures/mapActionFixtures';

export const initialEventStateFixture = {
  rallypoints: [],
  keywords: [],
  selectedRallypoint: {},
  range: 10,
};

export const eventReducerFetchFixture = {
  rallypoints: [
    fetchEventsResultsFixture,
  ],
  keywords: [],
  selectedRallypoint: {},
  range: 10,
};

export const eventReducerSelectFixture = {
  rallypoints: [
    fetchEventsResultsFixture,
  ],
  keywords: [],
  selectedRallypoint: fetchEventsResultsFixture,
  range: 10,
};
