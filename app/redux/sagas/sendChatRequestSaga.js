import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  SENT_ONE_TO_ONE_CHAT_REQUEST,
  SENT_ONE_TO_ONE_CHAT_REQUEST_FAILURE,
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

function* sendChatRequest(action) {
  getToken();
  var act = action;

  const {payload, chatRequestCallback} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('SendChatRequest ===>', payload);

      if (token != '') {
        const response = await axios.post(
          `${baseUrl}sendOneToOneChatRequest`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response sendChatRequest ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          //   await put({type: SEND_CP_REQUEST_SUCCESS, res});
          chatRequestCallback(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error ===>', error.message);

      //   await put({
      //     type: SENT_ONE_TO_ONE_CHAT_REQUEST_FAILURE,
      //     error: error.message,
      //   });
    }
  }, 1000);
}

export default function* sendChatRequestSaga() {
  yield takeEvery(SENT_ONE_TO_ONE_CHAT_REQUEST, sendChatRequest);
}
