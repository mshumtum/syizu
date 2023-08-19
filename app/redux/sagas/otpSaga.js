import {put, takeEvery} from 'redux-saga/effects';
import {GET_OTP_SUCCESS, GET_OTP_FAILURE, GET_OTP} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import {decrypted} from '../../utils/encDecData';

function* getOtp(action) {
  const {payload, callBack} = action.payload;

  console.log('getOtpAction==>', action);

  try {
    console.log('check1', payload);
    const response = yield axios.post(`${baseUrl}getOtp`, payload);
    // const response = yield getLanguage();
    console.log('Response', response.data.status);
    const res = response.data.data;
    if (response.data.status) {
      yield put({type: GET_OTP_SUCCESS, response});
      callBack(true, res.otp, res._id);
    } else {
      alert(response.data.data.message);
    }
  } catch (error) {
    console.log('Response', error);
    yield put({type: GET_OTP_FAILURE, error: error.message});
  }
}

export default function* getOtpSaga() {
  yield takeEvery(GET_OTP, getOtp);
}
