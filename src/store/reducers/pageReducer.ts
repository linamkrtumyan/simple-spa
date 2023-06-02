import { PAGINATE } from "../types";

interface IPageAction {
  type: string;
  payload: any;
}

interface IPageState {
  page: number;
}

const initialState: IPageState = {
  page: 1,
};

const pageReducer = (state = initialState, action: IPageAction) => {
  switch (action.type) {
    case PAGINATE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      return { ...state };
  }
};

export default pageReducer;
