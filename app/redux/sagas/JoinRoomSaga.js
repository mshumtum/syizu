import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
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
    console.log('Join Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Join Token==>', e);
    // error reading value
  }
};

function* joinRoom(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('JoinRoomAction==>', action);
  const {payload, joinCallback} = action.payload;
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}joinChatRoom`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        // console.log('Response Join Room===>', response.data.status);
        const res = response.data;
        if (response.data.status) {
          // console.log('Response===>', res);
          // if (res != {}) {
          await put({type: JOIN_ROOM_SUCCESS, response});
          joinCallback(res);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      await put({type: JOIN_ROOM_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* joinRoomSaga() {
  yield takeEvery(JOIN_ROOM, joinRoom);
}
