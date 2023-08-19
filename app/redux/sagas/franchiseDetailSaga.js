import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {FRANCHISE_DETAIL} from '../actionType';
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

function* franchiseDetail(action) {
  getToken();

  const {payload, callbackFranchiseData} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('GetFranchise Details==>', payload);

      //   getFranchiseDetails?id=63f0751100b3dadd95f569bd
      if (token != '') {
        var url = `${baseUrl}getFranchiseDetails?id=${payload.userId}`;
        const response = await axios.get(url, config);

        var res = response.data;

        if (response.data.status) {
          console.log('FRANCHISE_DETAIL_SUCCESS  ====> ', res);
          // await put({type: GET_USER_DETAIL_SUCCESS, res});
          callbackFranchiseData(res);
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

export default function* franchiseDetailSaga() {
  yield takeEvery(FRANCHISE_DETAIL, franchiseDetail);
}
