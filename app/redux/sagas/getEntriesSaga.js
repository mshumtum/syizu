import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_COIN, GET_ENTRY, GET_FRAME} from '../actionType';
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

function* getEntry(action) {
  getToken();

  const {callbackEntry} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getEntries`, config);
        // const response = yield getLanguage();
        // console.log('Response Gifts', response.data);
        var res = response.data;

        if (response.data.status) {
          callbackEntry(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Frames Error', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getEntrySaga() {
  yield takeEvery(GET_ENTRY, getEntry);
}
