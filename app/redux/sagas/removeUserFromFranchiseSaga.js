import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  DELETE_CHATROOM,
  REMOVE_FROM_AUDIO_CHATROOM,
  REMOVE_USER_FROM_FRANCHISE,
} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');

    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* removeUserFromFranchise(action) {
  getToken();
  var act = action;

  const {payload, callbackRemove} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Remove User From Franchise ===>', payload);

      if (token != '') {
        console.log('Token===>', token);
        const response = await axios.post(
          `${baseUrl}removeUserFromFranschise`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response removeUserFromFranchise ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          //   await put({type: SEND_CP_REQUEST_SUCCESS, res});
          callbackRemove(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error ===>', error.message);

      //   await put({
      //     type: SENT_ONE_TO_ONE_CHAT_REQUEST_FAILURE,
      //     error: error.message,
      //   });
    }
  }, 1000);
}

export default function* removeUserFromFranchiseSaga() {
  yield takeEvery(REMOVE_USER_FROM_FRANCHISE, removeUserFromFranchise);
}
