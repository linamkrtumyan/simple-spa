import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "../types";

import data from "../../data/data.json";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    const language = localStorage.getItem("lang");
    dispatch(fetchUsersSuccess(data[language]));
  };
};

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (data) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: {
      data,
    },
  };
};
