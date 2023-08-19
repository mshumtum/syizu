import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('StoreData==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('StoreData==>', e);
    // error reading value
  }
};

function* getMessage(action) {
  //   console.log('GetMessageAction==>', action);
  const {payload, callBack} = action.payload;

  console.log('GetMessageAction==>', action.payload);

  try {
    console.log('check1');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    console.log('Token', token);

    const response = yield axios.post(
      `${baseUrl}get_messages`,
      payload,
      config,
    );
    // const response = yield getLanguage();
    console.log('Response', response.data.status);
    const res = decrypted(response.data.data);
    if (response.data.status) {
      //   console.log('Response===>', res);
      yield put({type: GET_MESSAGES_SUCCESS, res});
      callBack(res);
    }
  } catch (error) {
    console.log('ResponseError==>', error);
    yield put({type: GET_MESSAGES_FAILURE, error: error.message});
  }
}

export default function* getMessageSaga() {
  getToken();
  yield takeEvery(GET_MESSAGES, getMessage);
}
