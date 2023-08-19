import {decrypted, encrypted} from '../../utils/encDecData';
import {HOME_API_FAILURE, HOME_API_SUCCESS} from '../actionType';

let initialState = {
  homeData: [],
};

const getHomReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_API_SUCCESS:
      console.log('HomeReducer==>', action.res);
      var decryptedData = action.res;
      console.log('EncryptedHomeData', decryptedData);
      return {
        ...state.homeData,
        homeData: decryptedData,
        loading: false,
      };

    case HOME_API_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default getHomReducer;
