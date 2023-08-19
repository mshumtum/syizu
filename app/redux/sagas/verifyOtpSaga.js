import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';

import {
  VERIFY_OTP,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';
import {storeId, storeToken, storeUsername} from '../../utils/localStorage';

function* verifyOtp(action) {
  const {payload, callBackOtp} = action.payload;

  console.log('getOtpAction==>', action);

  try {
    console.log('check1', payload);
    const response = yield axios.post(`${baseUrl}verifyOtp`, payload);
    console.log('Response', response.data);
    const res = response.data;
    if (response.data.status) {
      console.log('OtpVerifyResponse===>', res.token);

      const token = res.token;
      const id = res.data._id;
      const username = res.data.userName;

      console.log('Username', username);

      storeToken(token);
      storeId(id);
      storeUsername(username);

      yield put({type: VERIFY_OTP_SUCCESS, response});
      setTimeout(() => {
        callBackOtp(true, res.data.isProfileCompleted);
      }, 1000);
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log('Response', error);
    yield put({type: VERIFY_OTP_FAILURE, error: error.message});
  }
}

export default function* verifyOtpSaga() {
  yield takeEvery(VERIFY_OTP, verifyOtp);
}
