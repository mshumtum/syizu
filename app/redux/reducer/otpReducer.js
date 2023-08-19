import {GET_OTP_FAILURE, GET_OTP_SUCCESS} from '../actionType';

let initialState = {
  otpData: [],
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OTP_SUCCESS:
      console.log('otpReducer', action.response.data.data);
      // var decryptedData = decrypted(action.response.data.data.encrypt);
      // console.log('EncryptedLang', decryptedData);
      return {
        ...state.langData,
        otpData: action.response.data.data,
        loading: false,
      };

    case GET_OTP_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default otpReducer;
