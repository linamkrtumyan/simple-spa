import { SET_LANGUAGE } from "../types";

interface ILanguageAction {
  type: string;
  payload: any;
}

interface ILanguageState {
  lang: string;
}

const initialState: ILanguageState = {
  lang: localStorage.getItem("lang") || "en",
};

const languageReducer = (state = initialState, action: ILanguageAction) => {
  switch (action.type) {
    case SET_LANGUAGE:
      localStorage.setItem("lang", action.payload.lang);
      return {
        ...state,
        lang: action.payload.lang,
      };

    default:
      return { ...state };
  }
};

export default languageReducer;
