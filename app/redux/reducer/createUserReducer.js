import {CREATE_USER_FAILURE, CREATE_USER_SUCCESS} from '../actionType';

let initialState = {
  verifyOtpData: [],
};

const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      console.log('CreateUser', action.res);
      // var decryptedData = decrypted(action.response.data.data.encrypt);
      // console.log('EncryptedLang', decryptedData);
      return {
        ...state,
        verifyOtpData: action.res,
        loading: false,
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default createUserReducer;
