import {
  GET_OTP_FAILURE,
  GET_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from '../actionType';

let initialState = {
  verifyOtpData: [],
};

const verifyOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_SUCCESS:
      console.log('verify', action.response.data.data);
      // var decryptedData = decrypted(action.response.data.data.encrypt);
      // console.log('EncryptedLang', decryptedData);
      return {
        ...state,
        verifyOtpData: action.response.data.data,
        loading: false,
      };

    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default verifyOtpReducer;
