import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_GROUP_MESSAGE, GET_SUPPORTER} from '../actionType';
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

function* getGroupMessage(action) {
  getToken();
  var act = action;

  const {payloadMessage, messageCallback} = action.payload;

  setTimeout(async () => {
    try {
      const config = {
        headers: {Authorization: `${token}`},
      };

      //   console.log('Get Franchise ==>', config);

      if (token != '') {
        var url = `${baseUrl}getMessages?chatRoomId=${payloadMessage.roomId}&skip=0&limit=${payloadMessage.skip}`;
        const response = await axios.get(url, config);
        // const response = yield getLanguage();
        // console.log('Response ChatList ===> ', response.data);
        var res = response.data;

        if (response.data.status) {
          messageCallback(res);
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

export default function* getGroupMessageSaga() {
  yield takeEvery(GET_GROUP_MESSAGE, getGroupMessage);
}
