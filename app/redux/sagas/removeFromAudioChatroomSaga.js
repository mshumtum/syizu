import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {DELETE_CHATROOM, REMOVE_FROM_AUDIO_CHATROOM} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');

    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* removeFromAudioChatroom(action) {
  getToken();
  var act = action;

  const {payload} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('removeFromAudioChatroom ===>', payload);

      if (token != '') {
        console.log('Token===>', token);
        const response = await axios.post(
          `${baseUrl}removeFromAudioChatRoom`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response removeFromAudioChatroom ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          //   await put({type: SEND_CP_REQUEST_SUCCESS, res});
          //   chatRequestCallback(res);
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

export default function* removeFromAudioChatroomSaga() {
  yield takeEvery(REMOVE_FROM_AUDIO_CHATROOM, removeFromAudioChatroom);
}
