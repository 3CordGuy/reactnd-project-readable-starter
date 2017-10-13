import * as ReadableAPI from "../Util/readable-api";

export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getCategories = () => dispatch => {
  dispatch(requestCategories());
  ReadableAPI.getCategories().then(response =>
    dispatch(receiveCategories(response.categories))
  );
};
