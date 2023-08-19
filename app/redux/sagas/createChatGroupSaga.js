import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
  CREATE_CHAT_GROUP,
  CREATE_CHAT_GROUP_FAILURE,
  CREATE_CHAT_GROUP_SUCCESS,
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

function* createChatGroup(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('createChatGroup==>', action);
  const {payload, callBack} = action.payload;
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}addChatRoom`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response Create Room===>', response.data.status);
        const res = response.data;
        if (response.data.status) {
          console.log('Response ===>', res);
          // if (res != {}) {
          await put({type: CREATE_CHAT_GROUP_SUCCESS, response});
          callBack(true, response.data.data);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      await put({type: CREATE_CHAT_GROUP_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* createChatGroupSaga() {
  yield takeEvery(CREATE_CHAT_GROUP, createChatGroup);
}
