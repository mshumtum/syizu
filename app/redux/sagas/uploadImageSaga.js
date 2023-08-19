import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {UPLOAD_IMAGE} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Join Token==>', e);
    // error reading value
  }
};

function* uploadImage(action) {
  // console.log('JoinChatroomAction', action);
  getToken();

  const {payload, callbackUpload} = action.payload;

  console.log('Upload==>', payload, '   ', payload.length);
  setTimeout(async () => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      };
      if (token != '') {
        console.log('Token', config);

        const response = await axios.post(`${baseUrl}upload`, payload, config);

        console.log('Response ==>', response);

        // const res = response.data;
        if (response.data != null) {
          //   console.log('Response UNFollow User ===>', res);
          // if (res != {}) {
          //   await put({type: FOLLOW_USER_REQUEST_SUCCESS, response});
          callbackUpload(response.data);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          console.log('ResponseError2  ==>', response);
          alert('server issue');
        }
      }
    } catch (error) {
      if (error.response.status === 413) {
        console.log('File is too large');
      } else {
        console.log('File upload failed:', error);
      }
      //   await put({type: FOLLOW_USER_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* uploadImageSaga() {
  yield takeEvery(UPLOAD_IMAGE, uploadImage);
}
