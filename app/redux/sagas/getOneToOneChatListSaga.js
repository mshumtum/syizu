import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_ONE_TO_ONE_CHAT_LIST} from '../actionType';
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

function* getOneToOneChatList(action) {
  getToken();
  var act = action;

  const {chatListCallback} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        const response = await axios.get(
          `${baseUrl}getOneToOneChatList`,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response ChatList ===>', response.data);
        var res = response.data;

        if (response.data.status) {
          chatListCallback(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getOneToOneChatListSaga() {
  yield takeEvery(GET_ONE_TO_ONE_CHAT_LIST, getOneToOneChatList);
}
