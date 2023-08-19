import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { BUY_BACKGROUND_IMAGE, BUY_ENTRY } from '../actionType';
import { baseUrl } from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Buy Frame Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Buy Frame Token==>', e);
    // error reading value
  }
};

function* buyEntries(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('buyEntries ==>', action);
  const { payload, buyEntryCallback } = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: { Authorization: `${token}` },
      };
      if (token != '') {
        const response = await axios.post(
          `${baseUrl}buyEntries`,
          payload,
          config,
        );
        const res = response.data;
        if (response.data.status == 1) {
          buyEntryCallback({ res, payload });
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* buyEntriesSaga() {
  yield takeEvery(BUY_ENTRY, buyEntries);
}
