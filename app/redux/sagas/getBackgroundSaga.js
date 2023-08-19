import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_BACKGROUND_IMAGE, GET_COIN, GET_FRAME} from '../actionType';
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

function* getBackgroundImage(action) {
  getToken();

  const {callbackBackgroundImage} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      if (token != '') {
        const response = await axios.get(
          `${baseUrl}getBackgroundImages`,
          config,
        );
        var res = response.data;

        if (response.data.status) {
          callbackBackgroundImage(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('getBackgroundImage Error', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getBackgroundImageSaga() {
  yield takeEvery(GET_BACKGROUND_IMAGE, getBackgroundImage);
}
