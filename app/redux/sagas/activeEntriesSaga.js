import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {ACTIVE_ENTRY, ACTIVE_FRAME} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Active Frame Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Active Frame Token==>', e);
    // error reading value
  }
};

function* activeEntries(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('Active Frame ==>', action);
  const {payload, activeEntryCallback} = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        const response = await axios.put(
          `${baseUrl}activeEntries`,
          payload,
          config,
        );
        const res = response.data;
        if (response.data.status == 1) {
          activeEntryCallback(res);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* activeEntriesSaga() {
  yield takeEvery(ACTIVE_ENTRY, activeEntries);
}
