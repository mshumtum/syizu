import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_MY_CHATROOM_DATA,
  GET_MY_CHATROOM_DATA_FAILURE,
  GET_MY_CHATROOM_DATA_SUCCESS,
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

function* getChatroomData(action) {
  getToken();
  var act = action;

  const {callbackData} = action.payload;
  console.log('Action ===>', action.payload);

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('GetChatroom ===>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getMyChatRoom`, config);
        // const response = yield getLanguage();
        console.log('Response GetChatroom ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: GET_MY_CHATROOM_DATA_SUCCESS, res});
          callbackData(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: GET_MY_CHATROOM_DATA_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getChatroomDataSaga() {
  yield takeEvery(GET_MY_CHATROOM_DATA, getChatroomData);
}
