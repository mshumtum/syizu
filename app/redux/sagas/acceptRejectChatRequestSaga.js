import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
  ACCEPT_REJECT_CHAT_REQUEST,
  ACCEPT_REJECT_CHAT_REQUEST_FAILURE,
  ACCEPT_REJECT_CHAT_REQUEST_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    // console.log('StoreData==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('StoreData==>', e);
    // error reading value
  }
};

function* acceptRejectChatRequest(action) {
  getToken();

  console.log('CreateUserAction', action);
  const {payload, callbackRequest} = action.payload;

  console.log('AcceptRejectRequest==>', action.payload);
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Token', token);

      const response = await axios.post(
        `${baseUrl}acceptRejectRequest`,
        payload,
        config,
      );
      // const response = yield getLanguage();
      console.log('Response Accept Reject', response.data.status);
      console.log('Response===>', response.data.data);
      const res = response.data.data;
      // if (response.data.status!=0) {
      // await put({type: ACCEPT_REJECT_CHAT_REQUEST_SUCCESS, res});
      callbackRequest(res);
      // }
    } catch (error) {
      console.log('ResponseError==>', error);
      // await put({
      //   type: ACCEPT_REJECT_CHAT_REQUEST_FAILURE,
      //   error: error.message,
      // });
    }
  }, 1000);
}

export default function* acceptRejectChatRequestSaga() {
  yield takeEvery(ACCEPT_REJECT_CHAT_REQUEST, acceptRejectChatRequest);
}
