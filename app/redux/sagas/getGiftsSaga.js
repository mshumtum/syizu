import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  GET_FRANCHISE,
  GET_FRANCHISE_SUCCESS,
  GET_FRANCHISE_FAILURE,
  GET_GIFT,
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

function* getGifts(action) {
  getToken();
  var act = action;

  const {callbackGifts} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getGifts`, config);
        // const response = yield getLanguage();
        // console.log('Response Gifts', response.data);
        var res = response.data;

        if (response.data.status) {
          callbackGifts(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Gift Error', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getGiftsSaga() {
  yield takeEvery(GET_GIFT, getGifts);
}
