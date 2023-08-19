import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_TAGS_SUCCESS, GET_TAGS_FAILURE, GET_TAGS} from '../actionType';
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

function* getTagsData(action) {
  getToken();
  var act = action;

  const {callBackTags} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      console.log('GetTags==>', config);

      if (token != '') {
        const response = await axios.get(`${baseUrl}getAllTags`, config);
        // const response = yield getLanguage();
        console.log('ResponseTags', response.data);
        var res = response.data;

        if (response.data.status) {
          await put({type: GET_TAGS_SUCCESS, res});
          callBackTags(res);
          // setActiveChatData(response.data.data);
        }
      }
    } catch (error) {
      console.log('ErrorTags', error.message);

      Toast.show({
        type: 'failure',
        text1: 'Something went wrong',
      });
      await put({type: GET_TAGS_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* getTagsSaga() {
  yield takeEvery(GET_TAGS, getTagsData);
}
