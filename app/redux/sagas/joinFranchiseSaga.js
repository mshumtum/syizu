import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {
  JOIN_FRANCHISE_REQUEST,
  JOIN_FRANCHISE_REQUEST_FAILURE,
  JOIN_FRANCHISE_REQUEST_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Join Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Join Token==>', e);
    // error reading value
  }
};

function* joinFranchise(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('JoinRoomAction==>', action);
  const {payload, joinFranchiseCallback} = action.payload;
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}requestfranchise`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response Join Room===>', response.data.status);
        const res = response.data;
        if (response.data.status) {
          console.log('Response===>', res);
          // if (res != {}) {
          await put({type: JOIN_FRANCHISE_REQUEST_SUCCESS, response});
          joinFranchiseCallback(res);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      await put({type: JOIN_FRANCHISE_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* joinFranchiseSaga() {
  yield takeEvery(JOIN_FRANCHISE_REQUEST, joinFranchise);
}
