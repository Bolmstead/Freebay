import axios from 'axios';
import FreebayAPI from '../Api.js'

export function getCurrentUserFromAPI(username) {
  return async function (dispatch) {
    const response = await FreebayAPI.getUser(username);
    console.log("responses from getCurrentUserFromAPI", response)
    return dispatch(getUser(response));
  };
}

function getUser(currentUser) {
  return {
    type: "GET_CURRENT_USER",
    currentUser,
  };
}

