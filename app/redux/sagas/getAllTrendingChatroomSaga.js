import {takeEvery} from 'redux-saga/effects';
import {GET_ALL_CHATROOM, GET_ALL_TRENDING_CHATROOM} from '../actionType';
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
      token = value;
    }
  } catch (e) {
    console.log('Token Trending==>', e);
    // error reading value
  }
};

function* getAllTrendingChatroom(action) {
  getToken();
  const {callBack} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      if (token != '') {
        const response = await axios.get(`${baseUrl}trendingChatRoom`, config);
        // const response = yield getLanguage();
        console.log('GET_ALL_TRENDING_CHATROOM', response.data);
        var res = response.data.trendingChatRoom;

        if (response.data.status) {
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
    }
  }, 1000);
}

export default function* getAllTrendingChatroomSaga() {
  yield takeEvery(GET_ALL_TRENDING_CHATROOM, getAllTrendingChatroom);
}
