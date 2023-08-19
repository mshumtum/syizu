import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {LEADER_BOARD_GIFTER} from '../actionType';
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

function* leaderBoardGifter(action) {
  var act = action;
  getToken();

  const {payload, callbackGifter} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };
      console.log('Gifter Payload ==>', payload);
      if (token != '') {
        var url = `${baseUrl}getLeaderBoardData?module=${payload.module}&type=${payload.type}`;
        const response = await axios.get(url, config);
        // const response = yield getLanguage();
        // console.log('ResponseGetchat', response.data);
        var res = response.data;

        if (response.data.status) {
          console.log(response.data.status);
          callbackGifter(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErroreGetchat', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* leaderBoardGifterSaga() {
  yield takeEvery(LEADER_BOARD_GIFTER, leaderBoardGifter);
}
