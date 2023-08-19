import {
  CREATE_CHAT_GROUP_FAILURE,
  CREATE_CHAT_GROUP_SUCCESS,
} from '../actionType';

let initialState = {
  createChatGroupData: [],
};

const createChatGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHAT_GROUP_SUCCESS:
      console.log('CreateChatGroup', action.res);
      // var decryptedData = decrypted(action.response.data.data.encrypt);
      // console.log('EncryptedLang', decryptedData);
      return {
        ...state,
        createChatGroupData: action.res,
        loading: false,
      };

    case CREATE_CHAT_GROUP_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default createChatGroupReducer;
