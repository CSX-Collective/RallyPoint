import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
mockStore({
  user: {
    name: '',
    email: '',
    username: '',
    isCreating: false,
    isLoggedIn: false,
    didLogout: false,
  },
});

export default mockStore;
