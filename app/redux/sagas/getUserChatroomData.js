import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  GET_USER_CHATROOM_DATA,
  GET_USER_CHATROOM_DATA_FAILURE,
  GET_USER_CHATROOM_DATA_SUCCESS,
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
    // console.log('Token===>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* getUserChatroomData(action) {
  getToken();
  var act = action;

  const {callbackData, payload} = action.payload;

  console.log('payload ===>', action);

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      // console.log('GET_USER_DATA==>', config);

      if (token != '') {
        var url = `${baseUrl}getUserChatRoom?chatRoomId=${payload.roomID}`;
        // console.log('URL ===> ', url);
        const response = await axios.get(url, config);
        // const response = yield getLanguage();
        // console.log('Response GET GROUP MESSAGE ==>', response.data);
        // var res = response.data;

        if (response.data.status) {
          // console.log(response.data.status);
          callbackData(response.data);
        }
      }
    } catch (error) {
      console.log('User Chatroom ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getUserChatroomDataSaga() {
  yield takeEvery(GET_USER_CHATROOM_DATA, getUserChatroomData);
}
