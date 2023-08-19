import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {UNFOLLOW_USER_REQUEST} from '../actionType';
import {baseUrl} from '../appConstants';

var token = '';
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log('Join Token==>', value);
    if (value !== null) {
      token = value;
    }
  } catch (e) {
    console.log('Join Token==>', e);
    // error reading value
  }
};

function* unFollowUser(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('FollowUser==>', action);
  const {payload, followUserCallback} = action.payload;
  setTimeout(async () => {
    try {
      console.log('check1');

      const config = {
        headers: {Authorization: `${token}`},
      };
      if (token != '') {
        console.log('Token', token);

        const response = await axios.post(
          `${baseUrl}unFollowUser`,
          payload,
          config,
        );
        const res = response.data;
        if (response.data.status) {
          //   console.log('Response UNFollow User ===>', res);
          // if (res != {}) {
          //   await put({type: FOLLOW_USER_REQUEST_SUCCESS, response});
          followUserCallback(res);
          // } else {
          //   alert(response.data.message);
          // }
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      //   await put({type: FOLLOW_USER_REQUEST_FAILURE, error: error.message});
    }
  }, 1000);
}

export default function* unFollowUserSaga() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unFollowUser);
}
