import { SET_LANGUAGE } from "../types";

export const setLanguage = (lang: string) => {
  return {
    type: SET_LANGUAGE,
    payload: {
      lang: lang,
    },
  };
};
