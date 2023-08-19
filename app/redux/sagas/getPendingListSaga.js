import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_TAGS,
  PENDING_LIST,
  PENDING_LIST_FAILURE,
  PENDING_LIST_SUCCESS,
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

function* pendingList(action) {
  getToken();
  var act = action;

  const {callBackPendingList} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('Get Pending List==>', config);

      if (token != '') {
        const response = await axios.get(
          `${baseUrl}getOneToOnePendingList`,
          config,
        );
        // const response = yield getLanguage();
        console.log('ResponseList', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: PENDING_LIST_SUCCESS, res});
          callBackPendingList(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: PENDING_LIST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getPendingListSaga() {
  yield takeEvery(PENDING_LIST, pendingList);
}
