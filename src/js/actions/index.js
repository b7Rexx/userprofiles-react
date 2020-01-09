import {LOGGED_STATUS, ACTIVE_NAV, USER_LIST, USER_PROFILE,MY_PROFILE} from "../constants/action-types";

export function userList(payload) {
  return {type: USER_LIST, payload};
}

export function activeNav(payload) {
  return {type: ACTIVE_NAV, payload};
}

export function loggedStatus(payload) {
  return {type: LOGGED_STATUS, payload};
}

export function userProfile(payload) {
  return {type: USER_PROFILE, payload};
}

export function setMyProfile(payload) {
  return {type: MY_PROFILE, payload};
}
