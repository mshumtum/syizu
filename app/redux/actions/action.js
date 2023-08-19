import {
  ACCEPT_REJECT_CHAT_REQUEST,
  ACCEPT_REJECT_FRANCHISE_REQUEST,
  ACCEPT_REJECT_REQUEST,
  ACTIVE_BACKGROUND_IMAGE,
  ACTIVE_ENTRY,
  ACTIVE_FRAME,
  ADD_MONEY,
  AUDIO_REQUEST,
  BUY_BACKGROUND_IMAGE,
  BUY_ENTRY,
  BUY_FRAME,
  CREATE_CHAT_GROUP,
  CREATE_ORDER,
  CREATE_USER,
  DELETE_CHATROOM,
  FOLLOW_USER_REQUEST,
  FRANCHISE_DETAIL,
  GET_ALL_CHATROOM,
  GET_ALL_CHAT_ROOM,
  GET_ALL_TOP_CHATROOM,
  GET_ALL_TRENDING_CHATROOM,
  GET_BACKGROUND_IMAGE,
  GET_CHAT_GROUP,
  GET_COIN,
  GET_ENTRY,
  GET_FRAME,
  GET_FRANCHISE,
  GET_FRANCHISE_REQUEST,
  GET_GIFT,
  GET_GROUP_MESSAGE,
  GET_LANGUAGE_REQUEST,
  GET_MESSAGES,
  GET_MY_CHATROOM,
  GET_MY_CHATROOM_DATA,
  GET_MY_LEVEL,
  GET_MY_PROFILE,
  GET_ONE_TO_ONE_CHAT_DETAIL,
  GET_ONE_TO_ONE_CHAT_LIST,
  GET_OTP,
  GET_STICKER,
  GET_SUPPORTER,
  GET_TAGS,
  GET_USER_CHATROOM_DATA,
  GET_USER_DETAIL,
  GET_WALLET,
  HELP,
  HOME_API,
  JOIN_CHATROOM,
  JOIN_FRANCHISE_REQUEST,
  JOIN_ROOM,
  LEADER_BOARD_GIFTER,
  LOGOUT,
  PENDING_LIST,
  REMOVE_FROM_AUDIO_CHATROOM,
  REMOVE_USER_FROM_FRANCHISE,
  SAVE_TRANSACTION,
  SEARCH,
  SEND_AUDIO_REQUEST,
  SEND_CP_REQUEST,
  SEND_WAR_REQUEST,
  SENT_ONE_TO_ONE_CHAT_REQUEST,
  UNFOLLOW_USER_REQUEST,
  UPDATE_PROFILE,
  UPLOAD_IMAGE,
  VERIFY_OTP,
} from '../actionType';
export const getLanguage = data => ({
  type: GET_LANGUAGE_REQUEST,
  payload: data,
});

export const getOtp = data => ({
  type: GET_OTP,
  payload: data,
});

export const verifyOtp = data => ({
  type: VERIFY_OTP,
  payload: data,
});

export const createUser = data => ({
  type: CREATE_USER,
  payload: data,
});

export const createChatGroup = data => ({
  type: CREATE_CHAT_GROUP,
  payload: data,
});

export const getChatroom = data => ({
  type: GET_CHAT_GROUP,
  payload: data,
});

export const getMyChatroom = data => ({
  type: GET_MY_CHATROOM,
  payload: data,
});

export const getAllChatroom = data => ({
  type: GET_ALL_CHATROOM,
  payload: data,
});

export const getHomeData = data => ({
  type: HOME_API,
  payload: data,
});
export const joinChatroom = data => ({
  type: JOIN_CHATROOM,
  payload: data,
});

export const getMessage = data => ({
  type: GET_MESSAGES,
  payload: data,
});

export const getTags = data => ({
  type: GET_TAGS,
  payload: data,
});

export const joinRoom = data => ({
  type: JOIN_ROOM,
  payload: data,
});

export const getAudioRequest = data => ({
  type: AUDIO_REQUEST,
  payload: data,
});

export const acceptRejectRequest = data => ({
  type: ACCEPT_REJECT_REQUEST,
  payload: data,
});

export const getChatroomData = data => ({
  type: GET_MY_CHATROOM_DATA,
  payload: data,
});
export const getUserChatroomData = data => ({
  type: GET_USER_CHATROOM_DATA,
  payload: data,
});
export const sendAudioRequest = data => ({
  type: SEND_AUDIO_REQUEST,
  payload: data,
});
export const sendWarRequest = data => ({
  type: SEND_WAR_REQUEST,
  payload: data,
});
export const sendCPRequest = data => ({
  type: SEND_CP_REQUEST,
  payload: data,
});
export const joinFranchise = data => ({
  type: JOIN_FRANCHISE_REQUEST,
  payload: data,
});
export const followUser = data => ({
  type: FOLLOW_USER_REQUEST,
  payload: data,
});

export const unFollowUser = data => ({
  type: UNFOLLOW_USER_REQUEST,
  payload: data,
});

export const getFranchise = data => ({
  type: GET_FRANCHISE,
  payload: data,
});

export const getGifts = data => ({
  type: GET_GIFT,
  payload: data,
});
export const getSticker = data => ({
  type: GET_STICKER,
  payload: data,
});

export const addMoney = data => ({
  type: ADD_MONEY,
  payload: data,
});

export const getOneToOneChatList = data => ({
  type: GET_ONE_TO_ONE_CHAT_LIST,
  payload: data,
});

export const getOneToOneChatDetail = data => ({
  type: GET_ONE_TO_ONE_CHAT_DETAIL,
  payload: data,
});

export const sendChatRequest = data => ({
  type: SENT_ONE_TO_ONE_CHAT_REQUEST,
  payload: data,
});

export const pendingList = data => ({
  type: PENDING_LIST,
  payload: data,
});

export const acceptRejectChatRequest = data => ({
  type: ACCEPT_REJECT_CHAT_REQUEST,
  payload: data,
});

export const getWallet = data => ({
  type: GET_WALLET,
  payload: data,
});

export const getUserDetail = data => ({
  type: GET_USER_DETAIL,
  payload: data,
});

export const deleteChatroom = data => ({
  type: DELETE_CHATROOM,
  payload: data,
});

export const removeAudioChatroom = data => ({
  type: REMOVE_FROM_AUDIO_CHATROOM,
  payload: data,
});

export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  payload: data,
});
export const updateProfile = data => ({
  type: UPDATE_PROFILE,
  payload: data,
});

export const franchiseDetail = data => ({
  type: FRANCHISE_DETAIL,
  payload: data,
});

export const getFranchiseRequest = data => ({
  type: GET_FRANCHISE_REQUEST,
  payload: data,
});

export const acceptRejectFranchiseRequest = data => ({
  type: ACCEPT_REJECT_FRANCHISE_REQUEST,
  payload: data,
});
export const leaderBoardGifter = data => ({
  type: LEADER_BOARD_GIFTER,
  payload: data,
});

export const createOrder = data => ({
  type: CREATE_ORDER,
  payload: data,
});
export const removeUserFromFranchise = data => ({
  type: REMOVE_USER_FROM_FRANCHISE,
  payload: data,
});
export const saveTransaction = data => ({
  type: SAVE_TRANSACTION,
  payload: data,
});
export const getLevel = data => ({
  type: GET_MY_LEVEL,
  payload: data,
});
export const getSupporter = data => ({
  type: GET_SUPPORTER,
  payload: data,
});
export const getGroupMessage = data => ({
  type: GET_GROUP_MESSAGE,
  payload: data,
});
export const getAllChatrooms = data => ({
  type: GET_ALL_CHAT_ROOM,
  payload: data,
});
export const logout = data => ({
  type: LOGOUT,
  payload: data,
});

export const searchApi = data => ({
  type: SEARCH,
  payload: data,
});
export const helpApi = data => ({
  type: HELP,
  payload: data,
});

export const getMyProfile = data => ({
  type: GET_MY_PROFILE,
  payload: data,
});

export const getAllTrendingChatroom = data => ({
  type: GET_ALL_TRENDING_CHATROOM,
  payload: data,
});

export const getAllTopChatroom = data => ({
  type: GET_ALL_TOP_CHATROOM,
  payload: data,
});

export const getCoin = data => ({
  type: GET_COIN,
  payload: data,
});
export const getFrame = data => ({
  type: GET_FRAME,
  payload: data,
});
export const buyFrame = data => ({
  type: BUY_FRAME,
  payload: data,
});
export const activeFrame = data => ({
  type: ACTIVE_FRAME,
  payload: data,
});
export const getBackgroundImage = data => ({
  type: GET_BACKGROUND_IMAGE,
  payload: data,
});
export const buyBackgroundImage = data => ({
  type: BUY_BACKGROUND_IMAGE,
  payload: data,
});
export const activeBackgroundImage = data => ({
  type: ACTIVE_BACKGROUND_IMAGE,
  payload: data,
});

export const getEntry = data => ({
  type: GET_ENTRY,
  payload: data,
});
export const buyEntry = data => ({
  type: BUY_ENTRY,
  payload: data,
});
export const activeEntry = data => ({
  type: ACTIVE_ENTRY,
  payload: data,
});
