import { PAGINATE } from "../types";

export const paginate = (page: number) => {
  return {
    type: PAGINATE,
    payload: {
      page: page,
    },
  };
};
