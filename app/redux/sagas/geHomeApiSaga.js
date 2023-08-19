import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {HOME_API_SUCCESS, HOME_API_FAILURE, HOME_API} from '../actionType';
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

function* getHomeData(action) {
  var act = action;

  getToken();

  const {callBack} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      // console.log('GetHome==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}homeAPI`, config);
        // const response = yield getLanguage();
        // console.log('ResponseHome', response.data);s
        var res = response.data;

        if (response.data.status) {
          await put({type: HOME_API_SUCCESS, res});
          callBack(res);
          // setActiveChatData(response.data.data);
        } else {
          callBack(res);
        }
      }
    } catch (error) {
      console.log('ErrorHome', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: HOME_API_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getHomeApiSaga() {
  yield takeEvery(HOME_API, getHomeData);
}
