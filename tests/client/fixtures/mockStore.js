import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
mockStore({
  name: '',
  email: '',
  username: '',
});

export default mockStore;
