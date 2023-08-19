import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_CHAT_GROUP_SUCCESS,
  GET_CHAT_GROUP_FAILURE,
  GET_CHAT_GROUP,
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
    console.log('TokenChat==>', value);
    if (value !== null) {
      console.log('1');
      token = value;
    }
  } catch (e) {
    console.log('TokenChat==>', value);
    // error reading value
  }
};

function* getChatroom(action) {
  var act = action;

  const {callBack} = action.payload;

  try {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    console.log('GetChatAction==>', config);
    console.log('Tken==>', token);
    if (token != '') {
      const response = yield axios.get(`${baseUrl}get_chat_room`, config);
      // const response = yield getLanguage();
      console.log('ResponseGetchat', response.data);
      var res = decrypted(response.data.data);

      if (response.data.status) {
        yield put({type: GET_CHAT_GROUP_SUCCESS, res});
        console.log(response.data.status);
        callBack(res);
        // setActiveChatData(response.data.data);
      }
    }
  } catch (error) {
    console.log('ErroreGetchat', error.message);

    Toast.show({
      type: 'failure',
      text1: 'Something went wrong',
    });
    yield put({type: GET_CHAT_GROUP_FAILURE, error: error.message});
  }
}

export default function* getChatroomSaga() {
  getToken();
  yield takeEvery(GET_CHAT_GROUP, getChatroom);
}
