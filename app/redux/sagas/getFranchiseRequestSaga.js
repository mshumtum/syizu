import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  GET_FRANCHISE,
  GET_FRANCHISE_SUCCESS,
  GET_FRANCHISE_FAILURE,
  GET_GIFT,
  GET_FRANCHISE_REQUEST,
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

function* getFranchiseRequest(action) {
  getToken();
  const {callbackFranchiseRequest} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        const response = await axios.get(
          `${baseUrl}getMyFranschiseRequests`,
          config,
        );
        // const response = yield getLanguage();
        console.log('Response Franchise Requests', response.data);
        var res = response.data;

        if (response.data.status) {
          callbackFranchiseRequest(res);
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

export default function* getFranchiseRequestSaga() {
  yield takeEvery(GET_FRANCHISE_REQUEST, getFranchiseRequest);
}
