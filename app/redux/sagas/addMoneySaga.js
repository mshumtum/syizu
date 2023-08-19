import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { x64 } from 'react-native-crypto-js';
import { put, takeEvery } from 'redux-saga/effects';
import { decrypted } from '../../utils/encDecData';
import {
  ADD_MONEY,
  ADD_MONEY_FAILURE,
  ADD_MONEY_SUCCESS,
  CREATE_CHAT_GROUP,
  CREATE_CHAT_GROUP_FAILURE,
  CREATE_CHAT_GROUP_SUCCESS,
} from '../actionType';
import { baseUrl } from '../appConstants';

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

// function* addMoney(action) {
//   // console.log('JoinChatroomAction', action);
//   getToken();
//   console.log('createChatGroup==>', action);
//   const {payload, callbackAddPoint} = action.payload;
//   setTimeout(async () => {
//     try {
//       const config = {
//         headers: {Authorization: `${token}`},
//       };
//       if (token != '') {
//         const response = await axios.post(
//           `${baseUrl}addMoney`,
//           payload,
//           config,
//         );
//         const res = response.data;
//         if (response.data.status) {
//           await put({type: ADD_MONEY_SUCCESS, response});
//           callbackAddPoint(res);
//         } else {
//           alert(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log('ResponseError==>', error);
//       await put({type: ADD_MONEY_FAILURE, error: error.message});
//     }
//   }, 1000);
// }

function* addMoney(action) {
  // console.log('JoinChatroomAction', action);
  getToken();
  console.log('createChatGroup==>', action);
  const { payload, callbackAddPoint } = action.payload;
  setTimeout(async () => {
    try {
      const config = {
        headers: { Authorization: `${token}` },
      };
      if (token != '') {
        const response = await axios.post(
          `${baseUrl}generateOrder
          `,
          payload,
          config,
        );
        const res = response.data;
        if (response.data.status) {
          await put({ type: ADD_MONEY_SUCCESS, response });
          callbackAddPoint(res);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log('ResponseError==>', error);
      await put({ type: ADD_MONEY_FAILURE, error: error.message });
    }
  }, 1000);
}

export default function* addMoneySaga() {
  yield takeEvery(ADD_MONEY, addMoney);
}
