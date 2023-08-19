import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {SAVE_TRANSACTION} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Token===>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* saveTransaction(action) {
  getToken();
  var act = action;

  const {payload, transactionCallback} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Save Transaction ===>', payload);

      if (token != '') {
        const response = await axios.post(
          `${baseUrl}saveTransaction`,
          payload,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response Transaction ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          //   await put({type: SEND_CP_REQUEST_SUCCESS, res});
          transactionCallback(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('Error ===>', error.message);
    }
  }, 1000);
}

export default function* saveTransactionSaga() {
  yield takeEvery(SAVE_TRANSACTION, saveTransaction);
}
