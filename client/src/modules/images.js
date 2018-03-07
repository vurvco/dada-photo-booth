import {
  getImageUrls,
  subset
} from './storage';

export const FILENAMES = 'images/FILENAMES';
export const FILENAMES_REQUESTED = 'images/FILENAMES_REQUESTED';
export const RETRIEVE_REQUESTED = 'images/RETRIEVE_REQUESTED';
export const RETRIEVE = 'images/RETRIEVE';

const initialState = {
  filenames: [],
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

    case FILENAMES_REQUESTED:
      return {
        ...state,
        filenames: [],
        isRetrieving: true
      };

    case FILENAMES:
      return {
        ...state,
        filenames: action.filenames,
        isRetrieving: !state.isRetrieving
      };

    default:
      return state;
  }
};

export const retrieve = () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const filenameRef = firebase.database().ref('2018_hello_world/filenames');

    dispatch({
      type: FILENAMES_REQUESTED
    });

    filenameRef.on('value', async (snapshot) => {
      const filenames = snapshot.val();
      console.log({ filenames });

      dispatch({
        type: FILENAMES,
        filenames
      });

      dispatch({
        type: RETRIEVE_REQUESTED
      });
      const urls = await getImageUrls(filenames);

      return dispatch({
        type: RETRIEVE,
        urls: subset(urls, 2)
      });
    });
  };
};
