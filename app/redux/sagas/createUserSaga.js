import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {storeToken, storeUsername} from '../../utils/localStorage';
import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
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

function* createUser(action) {
  getToken();

  console.log('CreateUserAction', action);
  const {payload, callBack} = action.payload;

  console.log('createUserAction==>', action.payload);

  try {
    console.log('check1');

    const config = {
      headers: {Authorization: `${token}`},
    };

    console.log('Token', token);

    const response = yield axios.post(
      `${baseUrl}userSignUp`,
      action.payload.payload,
    );
    // const response = yield getLanguage();
    console.log('Response', response.data.status);
    const res = response.data.data;
    if (response.data.status) {
      console.log('Response===>', res);
      storeUsername(res.userName);
      yield put({type: CREATE_USER_SUCCESS, res});

      callBack(true);
    }
  } catch (error) {
    console.log('ResponseError==>', error);
    yield put({type: CREATE_USER_FAILURE, error: error.message});
  }
}

export default function* createUserSaga() {
  yield takeEvery(CREATE_USER, createUser);
}
