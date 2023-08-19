import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {HELP} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Help Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Help Token==>', e);
    // error reading value
  }
};

function* helpApi(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('Help ==>', action);
  const {payload, callbackHelp} = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        const response = await axios.post(`${baseUrl}help`, payload, config);
        const res = response.data;
        if (response.data.status) {
          callbackHelp(res);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* helpSaga() {
  yield takeEvery(HELP, helpApi);
}
