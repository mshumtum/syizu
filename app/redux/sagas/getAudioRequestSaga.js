import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  AUDIO_REQUEST,
  AUDIO_REQUEST_FAILURE,
  AUDIO_REQUEST_SUCCESS,
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

function* getAudioRequest(action) {
  getToken();
  var act = action;

  const {callBack} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('AudioRequest ===>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getAudioRequest`, config);
        // const response = yield getLanguage();
        console.log('Response AudioRequest ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: AUDIO_REQUEST_SUCCESS, res});
          callBack(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: AUDIO_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getAudioRequestSaga() {
  yield takeEvery(AUDIO_REQUEST, getAudioRequest);
}
