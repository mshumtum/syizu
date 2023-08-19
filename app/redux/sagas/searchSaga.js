import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_ONE_TO_ONE_CHAT_DETAIL,
  GET_ONE_TO_ONE_CHAT_LIST,
  SEARCH,
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

function* searchApi(action) {
  getToken();
  var act = action;

  const {payload, searchCallback} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        var url = `${baseUrl}searchHomeAPI?searchText=${payload.text}`;
        const response = await axios.get(url, config);
        // const response = yield getLanguage();
        // console.log('Response Search ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          searchCallback(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags Search', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
    }
  }, 1000);
}

export default function* searchSaga() {
  yield takeEvery(SEARCH, searchApi);
}
