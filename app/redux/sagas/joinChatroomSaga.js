import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
  JOIN_CHATROOM,
  JOIN_CHATROOM_FAILURE,
  JOIN_CHATROOM_SUCCESS,
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

function* joinChatroom(action) {
  // console.log('JoinChatroomAction', action);

  getToken();
  console.log('JoinRoomAction==>', action);
  const {payload, joinCallBack} = action.payload;
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}add_room_user`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response Join Data===>', response.data.status);
        const res = decrypted(response.data.data);
        if (response.data.status) {
          console.log('Response===>', res);
          // if (res != {}) {
          await put({type: JOIN_CHATROOM_SUCCESS, response});
          joinCallBack(res);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      await put({type: JOIN_CHATROOM_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* joinChatroomSaga() {
  yield takeEvery(JOIN_CHATROOM, joinChatroom);
}
