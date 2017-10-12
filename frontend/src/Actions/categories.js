import * as ReadableAPI from "../Util/readable-api";

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getCategories = () => dispatch =>
  ReadableAPI.getCategories().then(categories =>
    dispatch(receiveCategories(categories))
  );
