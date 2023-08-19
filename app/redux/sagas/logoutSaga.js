import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {x64} from 'react-native-crypto-js';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {LOGOUT} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');

    console.log('Token Logout===>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('logout ==>', e);
    // error reading value
  }
};

function* logout(action) {
  getToken();
  console.log('Logout==>', action);
  const {callbackLogout} = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      const request = {
        token: token,
      };

      console.log('Config Logout', config);
      if (token != '') {
        const response = await axios.post(
          `${baseUrl}userLogout`,
          request,
          config,
        );
        const res = response.data;
        console.log('Response ==> ', response.data);
        if (response.data.status == 1) {
          callbackLogout(res);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1500);
}

export default function* logoutSaga() {
  yield takeEvery(LOGOUT, logout);
}
