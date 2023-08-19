import {decrypted, encrypted} from '../../utils/encDecData';
import {GET_LANGUAGE_FAILURE, GET_LANGUAGE_SUCCESS} from '../actionType';

let initialState = {
  langData: [],
};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGE_SUCCESS:
      console.log('langReducer==>', action.response.data.data);
      var decryptedData = action.response.data.data;
      console.log('LangData', decryptedData);
      return {
        ...state.langData,
        langData: decryptedData,
        loading: false,
      };

    case GET_LANGUAGE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default langReducer;
