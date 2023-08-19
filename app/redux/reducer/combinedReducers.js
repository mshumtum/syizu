import {combineReducers} from 'redux';
import createChatGroupReducer from './createChatGroupReducer';
import createUserReducer from './createUserReducer';
import getChatroomReducer from './getChatroomReducer';
import getHomReducer from './getHomeReducer';
import langReducer from './langReducer';
import otpReducer from './otpReducer';
import verifyOtpReducer from './verifyOtpReducer';

export const combinedReducers = combineReducers({
  getLang: langReducer,
  getOtp: otpReducer,
  verifyOtp: verifyOtpReducer,
  createUser: createUserReducer,
  createChatGroup: createChatGroupReducer,
  getChatroom: getChatroomReducer,
  getHomeData: getHomReducer,
});
