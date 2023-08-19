import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_WALLET} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';
import Toast from 'react-native-toast-message';

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

function* getWallet(action) {
  getToken();
  const {callbackWallet} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Config Wallet ==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getWalletAmount`, config);
        // const response = yield getLanguage();
        // console.log('Response Wallet', response.data);
        var res = response.data;

        if (response.data.status) {
          callbackWallet(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getWalletSaga() {
  yield takeEvery(GET_WALLET, getWallet);
}
