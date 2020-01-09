import {LOGGED_STATUS, ACTIVE_NAV, USER_LIST, USER_PROFILE, MY_PROFILE} from "../constants/action-types";

const USER_ID = 1;

const initialState = {
  loggedStatus: true,
  activeNav: 'home',
  users: [],
  profileId: USER_ID,
  profile: {
    "id": 1,
    "email": "jaydon_gislason59@yahoo.com",
    "phone": "(998) 970-2799",
    "address": {
      "city": "South Nyah",
      "state": "New York",
      "country": "Equatorial Guinea",
      "zipCode": "16308-9260",
      "countryCode": "AX",
      "streetAddress": "3585 Lucinda Valleys"
    },
    "lastName": "Von",
    "firstName": "Walter",
    "profileImage": "https://s3.amazonaws.com/uifaces/faces/twitter/jeremyworboys/128.jpg"
  }
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
    case MY_PROFILE:
      return Object.assign({}, state, {
        activeNav: action.payload,
        profile: state.users.find(function (item) {
          return item.id === USER_ID;
        })
      });
    case USER_PROFILE:
      return Object.assign({}, state, {
        activeNav: 'profile',
        profileId: action.payload.profileId,
        color: action.payload.color || undefined,
        bgColor: action.payload.bgColor || undefined,
        profile: state.users.find(function (item) {
          return item.id === action.payload.profileId;
        })
      });
    default:
      return state;
  }
}

export default rootReducer;
