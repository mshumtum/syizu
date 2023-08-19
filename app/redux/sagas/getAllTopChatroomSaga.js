import {takeEvery} from 'redux-saga/effects';
import {GET_ALL_TOP_CHATROOM} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Token Top==>', e);
    // error reading value
  }
};

function* getAllTopChatroom(action) {
  getToken();
  const {callBack} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      if (token != '') {
        const response = await axios.get(`${baseUrl}topChatRoom`, config);
        // const response = yield getLanguage();

        var res = response.data.topChatRoom;

        if (response.data.status) {
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
    }
  }, 1000);
}

export default function* getAllTopChatroomSaga() {
  yield takeEvery(GET_ALL_TOP_CHATROOM, getAllTopChatroom);
}
