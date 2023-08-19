import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAILURE,
  GET_USER_DETAIL_SUCCESS,
} from '../actionType';
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

function* getUserDetail(action) {
  getToken();
  var act = action;

  const {payload, callbackUserData} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('GetTags==>', config);

      if (token != '') {
        var url = `${baseUrl}getOtherUserProfile?userId=${payload.userId}`;
        const response = await axios.get(url, config);

        var res = response.data;

        if (response.data.status) {
          console.log('GET_USER_DETAIL_SUCCESS  ====> ', res);
          // await put({type: GET_USER_DETAIL_SUCCESS, res});
          callbackUserData(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorUserData', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      // await put({type: GET_USER_DETAIL_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getUserDetailSaga() {
  yield takeEvery(GET_USER_DETAIL, getUserDetail);
}
