import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {decrypted} from '../../utils/encDecData';
import {ACCEPT_REJECT_FRANCHISE_REQUEST} from '../actionType';
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

function* acceptRejectFranchiseRequest(action) {
  getToken();

  const {payload, callbackRequest} = action.payload;

  console.log('AcceptRejectRequest==>', action.payload);

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Token', token);

      const response = await axios.post(
        `${baseUrl}acceptRequestfranchiseRequest`,
        payload,
        config,
      );
      // const response = yield getLanguage();
      console.log('Response Accept Reject', response.data.status);
      const res = response.data;
      if (response.data.status) {
        console.log('Response===>', res);
        callbackRequest(res);
      }
    } catch (error) {
      console.log('ResponseError==>', error);
    }
  }, 1000);
}

export default function* acceptRejectFranchiseRequestSaga() {
  yield takeEvery(
    ACCEPT_REJECT_FRANCHISE_REQUEST,
    acceptRejectFranchiseRequest,
  );
}
