import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {ACTIVE_BACKGROUND_IMAGE, ACTIVE_FRAME} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Active Background Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Active Background Token==>', e);
    // error reading value
  }
};

function* activeBackground(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('Active Frame ==>', action);
  const {payload, activeBackgroundCallback} = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        const response = await axios.put(
          `${baseUrl}activeBackgroundImages`,
          payload,
          config,
        );
        const res = response.data;
        if (response.data.status == 1) {
          activeBackgroundCallback(res);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* activeBackgroundSaga() {
  yield takeEvery(ACTIVE_BACKGROUND_IMAGE, activeBackground);
}
