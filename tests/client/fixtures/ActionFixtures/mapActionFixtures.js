// import * as types from '../../../../src/client/actions/ActionTypes';

const fetchEventsMockAction1 = {
  type: types.FETCH_EVENTS_REQUEST,
  coords: {
    lat: 34.053,
    lng: -118.242,
  },
  range: 10,
};

const fetchEventsMockAction2 = {
  type: types.FETCH_EVENTS_REQUEST,
  coords: {
    lat: -82.862,
    lng: 135,
  },
  range: 10,
};

const fetchEventsMockAction3 = {
  type: types.FETCH_EVENTS_REQUEST,
  coords: {
    lat: 34.053,
    lng: -118.242,
  },
  range: 0,
};

const fetchEventsResultsFixture = [
  {
    coords: {
      lat: 34.053,
      lng: -118.242,
    },
    title: 'TestEvent',
    host: 'John Doe',
    url: 'http://example.com/event',
    img: 'event_img.jpg',
    description: 'Just a test event.',
    participants: [
      {
        name: 'John Doe',
        url: 'http://example.com/jd',
        img: 'profile_img.jpg',
      },
    ],
    category: 'Party',
    keywords: ['Party', 'Pop-up', 'Test', 'Los Angeles'],
  },
];

const fetchEventsSuccessFixture = [
  fetchEventsMockAction1,
  {
    type: types.FETCH_EVENTS_SUCCESS,
    status: 'success',
    results: fetchEventsResultsFixture,
  },
];

const fetchEventsFailureFixture1 = [
  fetchEventsMockAction2,
  {
    type: types.FETCH_EVENTS_FAILURE,
    status: 'failure',
    results: [],
  },
];

const fetchEventsFailureFixture2 = [
  fetchEventsMockAction3,
  {
    type: types.FETCH_EVENTS_FAILURE,
    status: 'failure',
    results: [],
  },
];

module.exports = {
  fetchEventsMockAction1,
  fetchEventsMockAction2,
  fetchEventsMockAction3,
  fetchEventsResultsFixture,
  fetchEventsSuccessFixture,
  fetchEventsFailureFixture1,
  fetchEventsFailureFixture2,
};
