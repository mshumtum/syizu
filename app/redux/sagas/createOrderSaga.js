import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
  CREATE_ORDER,
  JOIN_CHATROOM,
  JOIN_CHATROOM_FAILURE,
  JOIN_CHATROOM_SUCCESS,
  JOIN_ROOM,
  JOIN_ROOM_FAILURE,
  JOIN_ROOM_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Token==>', e);
    // error reading value
  }
};

function* createOrder(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('create order Action==>', action);
  const {payload, orderCallback} = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}createOrder`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        // console.log('Response Join Room===>', response.data.status);
        const res = response.data;
        if (response.data.status) {
          orderCallback(res);
        } else {
          console.log(response);
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* createOrderSaga() {
  yield takeEvery(CREATE_ORDER, createOrder);
}
