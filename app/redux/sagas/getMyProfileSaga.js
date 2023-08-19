import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_MY_LEVEL, GET_MY_PROFILE, GET_WALLET} from '../actionType';
import {baseUrl} from '../appConstants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decrypted} from '../../utils/encDecData';
import Toast from 'react-native-toast-message';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    // console.log('Token===>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('TokenError==>', e);
    // error reading value
  }
};

function* getMyProfile(action) {
  getToken();
  const {callbackUserData} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getProfile`, config);
        // const response = yield getLanguage();
        console.log('Response Profile', response.data);
        var res = response.data;

        if (response.data.status == 1) {
          callbackUserData(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags Profile', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* getMyProfileSaga() {
  yield takeEvery(GET_MY_PROFILE, getMyProfile);
}
