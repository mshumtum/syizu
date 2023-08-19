import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  SEND_AUDIO_REQUEST_SUCCESS,
  SEND_WAR_REQUEST,
  SEND_WAR_REQUEST_FAILURE,
} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Token===>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* sendWarRequest(action) {
  getToken();
  var act = action;

  const {payload, callbackInviteRequest} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('SendAudioRequest ===>', payload);

      if (token != '') {
        const response = await axios.post(
          `${baseUrl}Createwar`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response sendAudioRequest ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: SEND_AUDIO_REQUEST_SUCCESS, res});
          callbackInviteRequest(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error ===>', error.message);

      await put({type: SEND_WAR_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* sendWarRequestSaga() {
  yield takeEvery(SEND_WAR_REQUEST, sendWarRequest);
}
