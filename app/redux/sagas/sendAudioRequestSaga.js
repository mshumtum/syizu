import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  AUDIO_REQUEST,
  AUDIO_REQUEST_FAILURE,
  AUDIO_REQUEST_SUCCESS,
  SEND_AUDIO_REQUEST,
  SEND_AUDIO_REQUEST_FAILURE,
  SEND_AUDIO_REQUEST_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';
import Toast from 'react-native-toast-message';

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

function* sendAudioRequest(action) {
  getToken();
  var act = action;

  const {payload, callbackRequest} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('SendAudioRequest ===>', payload);

      if (token != '') {
        const response = await axios.post(
          `${baseUrl}addAudioRequest`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response sendAudioRequest ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: SEND_AUDIO_REQUEST_SUCCESS, res});
          callbackRequest(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error ===>', error.message);

      await put({type: SEND_AUDIO_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* setAudioRequestSaga() {
  yield takeEvery(SEND_AUDIO_REQUEST, sendAudioRequest);
}
