import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "../types";

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
      };
    default:
      return { ...state };
  }
};

export default usersReducer;
