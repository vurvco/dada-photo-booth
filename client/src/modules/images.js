import {
  getImageUrls,
  filenames,
  subset
} from './storage';

export const RETRIEVE_REQUESTED = 'images/RETRIEVE_REQUESTED';
export const RETRIEVE = 'images/RETRIEVE';

const initialState = {
  urls: [],
  isRetrieving: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_REQUESTED:
      return {
        ...state,
        urls: [],
        isRetrieving: true
      };

    case RETRIEVE:
      return {
        ...state,
        urls: action.urls,
        isRetrieving: !state.isRetrieving
      };

    default:
      return state;
  }
};

export const retrieve = () => {
  return async (dispatch) => {
    dispatch({
      type: RETRIEVE_REQUESTED
    });

    const urls = await getImageUrls(filenames);

    return dispatch({
      type: RETRIEVE,
      urls: subset(urls, 8)
    });
  };
};
