import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_ALL_CHATROOM,
  GET_ALL_CHATROOM_FAILURE,
  GET_ALL_CHATROOM_SUCCESS,
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
    if (value !== null) {
      console.log('1');
      token = value;
    }
  } catch (e) {
    console.log('TokenChat==>', e);
    // error reading value
  }
};

function* getAllChatroom(action) {
  getToken();
  var act = action;

  const {callBack} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('GetAllChatAction==>', config);
      console.log('Tken==>', token);
      if (token != '') {
        const response = await axios.get(
          `${baseUrl}getAllChatRoom?type=2`,
          config,
        );
        // const response = yield getLanguage();
        console.log('ResponseGetAllChat', response.data);
        var res = response.data.data;

        if (response.data.status) {
          await put({type: GET_ALL_CHATROOM_SUCCESS, res});
          console.log(response.data.status);
          callBack(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorGetAllChat', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: GET_ALL_CHATROOM_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getAllChatroomSaga() {
  yield takeEvery(GET_ALL_CHATROOM, getAllChatroom);
}
