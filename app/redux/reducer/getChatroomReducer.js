import {decrypted, encrypted} from '../../utils/encDecData';
import {GET_CHAT_GROUP_FAILURE, GET_CHAT_GROUP_SUCCESS} from '../actionType';

let initialState = {
  chatroomData: [],
};

const getChatroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT_GROUP_SUCCESS:
      console.log('chatReducer==>', action.res);
      var decryptedData = action.res;
      console.log('EncryptedChat', decryptedData);
      return {
        ...state.chatroomData,
        chatroomData: decryptedData,
        loading: false,
      };

    case GET_CHAT_GROUP_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default getChatroomReducer;
