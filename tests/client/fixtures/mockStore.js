import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
mockStore({
  user: {
    _id: 1,
    name: '',
    email: '',
    username: '',
    coords: { lat: 0, lng: 0 },
    isPending: false,
    isLoggedIn: false,
  },
  events: {
    rallypoints: [],
    keywords: [],
    selectedRallypoint: {},
    range: 10,
  },
  viewUser: {

  },
});

export default mockStore;
