import {LOGGED_STATUS, ACTIVE_NAV, USER_LIST, USER_PROFILE} from "../constants/action-types";
import testapi from '../../test.json';

const USER_ID = 1;
const initialState = {
  loggedStatus: true,
  activeNav: 'home',
  users: testapi,
  profileId: USER_ID,
  profile: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LIST:
      return Object.assign({}, state, {users: action.payload});
    case LOGGED_STATUS:
      return Object.assign({}, state, {loggedStatus: action.payload});
    case ACTIVE_NAV:
      return Object.assign({}, state, {
        activeNav: action.payload,
        profile: state.users.find(function (item) {
          return item.id === USER_ID;
        })
      });
    case USER_PROFILE:
      return Object.assign({}, state, {
        activeNav: 'my-profile',
        profileId: action.payload,
        profile: state.users.find(function (item) {
          return item.id === action.payload;
        })
      });
    default:
      return state;
  }
}

export default rootReducer;
