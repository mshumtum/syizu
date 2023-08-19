import {all} from 'redux-saga/effects';
import {
  activeBackgroundImage,
  getAllTopChatroom,
  getAllTrendingChatroom,
  getUserChatroomData,
  joinRoom,
  removeUserFromFranchise,
} from '../actions/action';
import acceptRejectChatRequestSaga from './acceptRejectChatRequestSaga';
import acceptRejectFranchiseRequestSaga from './acceptRejectFranchiseRequestSaga';
import acceptRejectRequestSaga from './acceptRejectRequestSaga';
import addMoneySaga from './addMoneySaga';
import createChatGroupSaga from './createChatGroupSaga';
import createOrderSaga from './createOrderSaga';
import createUserSaga from './createUserSaga';
import deleteChatroomSaga from './deleteChatroomSaga';
import followUserSaga from './followUserSaga';
import franchiseDetailSaga from './franchiseDetailSaga';
import getHomeApiSaga from './geHomeApiSaga';
import getAllChatroomSaga from './getAllChatroomSaga';
import getAllChatroomsSaga from './getAllChatroomsSaga';
import getAllTopChatroomSaga from './getAllTopChatroomSaga';
import getAllTrendingChatroomSaga from './getAllTrendingChatroomSaga';
import getAudioRequestSaga from './getAudioRequestSaga';
import getChatroomDataSaga from './getChatroomDataSaga';
import getChatroomSaga from './getChatroomSaga';
import getFranchiseRequestSaga from './getFranchiseRequestSaga';
import getFranchiseSaga from './getFranchiseSaga';
import getGiftsSaga from './getGiftsSaga';
import getGroupMessageSaga from './getGroupMessageSaga';
import getLanguageSaga from './getLangSaga';
import getMessageSaga from './getMessageSaga';
import getMyChatroomSaga from './getMyChatroomSaga';
import getMyLevelSaga from './getMyLevelSaga';
import getMyProfileSaga from './getMyProfileSaga';
import getOneToOneChatDetailSaga from './getOneToOneChatDetail';
import getOneToOneChatListSaga from './getOneToOneChatListSaga';
import getPendingListSaga from './getPendingListSaga';
import getStickerSaga from './getStickerSaga';
import getSupporterSaga from './getSupporterSaga';
import getTagsSaga from './getTagsSaga';
import getUserChatroomDataSaga from './getUserChatroomData';
import getUserDetailSaga from './getUserDetailSaga';
import getWalletSaga from './getWalletSaga';
import helpSaga from './helpSaga';
import joinChatroomSaga from './joinChatroomSaga';
import joinFranchiseSaga from './joinFranchiseSaga';
import joinRoomSaga from './JoinRoomSaga';
import leaderBoardGifterSaga from './leaderBoardGifterSaga';
import logoutSaga from './logoutSaga';
import getOtpSaga from './otpSaga';
import removeFromAudioChatroomSaga from './removeFromAudioChatroomSaga';
import removeUserFromFranchiseSaga from './removeUserFromFranchiseSaga';
import saveTransactionSaga from './saveTransactionsSaga';
import searchSaga from './searchSaga';
import sendAudioRequestSaga from './sendAudioRequestSaga';
import sendChatRequestSaga from './sendChatRequestSaga';
import sendCPRequestSaga from './sendCPRequestSaga';
import setWarRequestSaga from './sendWarRequestSaga';
import unFollowUserSaga from './unFollowUserSaga';
import updateProfileSaga from './updateProfileSaga';
import uploadImageSaga from './uploadImageSaga';
import verifyOtpSaga from './verifyOtpSaga';
import getCoinSaga from './getCoinSaga';
import getBackgroundImageSaga from './getBackgroundSaga';
import getFrameSaga from './getFrameSaga';
import buyFrameSaga from './buyFrameSaga';
import buyBackgroundSaga from './buyBackgroundSaga';
import activeFrameSaga from './activeFrameSaga';
import activeBackgroundSaga from './activeBackgroundSaga';
import getEntrySaga from './getEntriesSaga';
import buyEntriesSaga from './buyEntriesSaga';
import activeEntriesSaga from './activeEntriesSaga';
function* rootSaga() {
  yield all([
    getLanguageSaga(),
    getOtpSaga(),
    verifyOtpSaga(),
    createUserSaga(),
    createChatGroupSaga(),
    getChatroomSaga(),
    getHomeApiSaga(),
    getMyChatroomSaga(),
    getAllChatroomSaga(),
    joinChatroomSaga(),
    getMessageSaga(),
    getTagsSaga(),
    joinRoomSaga(),
    getAudioRequestSaga(),
    acceptRejectRequestSaga(),
    getChatroomDataSaga(),
    getUserChatroomDataSaga(),
    sendAudioRequestSaga(),
    setWarRequestSaga(),
    sendCPRequestSaga(),
    joinFranchiseSaga(),
    followUserSaga(),
    getFranchiseSaga(),
    getGiftsSaga(),
    getOneToOneChatListSaga(),
    sendChatRequestSaga(),
    getPendingListSaga(),
    acceptRejectChatRequestSaga(),
    getOneToOneChatDetailSaga(),
    getWalletSaga(),
    addMoneySaga(),
    getUserDetailSaga(),
    deleteChatroomSaga(),
    removeFromAudioChatroomSaga(),
    unFollowUserSaga(),
    uploadImageSaga(),
    franchiseDetailSaga(),
    getFranchiseRequestSaga(),
    acceptRejectFranchiseRequestSaga(),
    getStickerSaga(),
    updateProfileSaga(),
    leaderBoardGifterSaga(),
    createOrderSaga(),
    removeUserFromFranchiseSaga(),
    saveTransactionSaga(),
    getMyLevelSaga(),
    getGroupMessageSaga(),
    getAllChatroomsSaga(),
    getSupporterSaga(),
    logoutSaga(),
    searchSaga(),
    getMyProfileSaga(),
    helpSaga(),
    getAllTrendingChatroomSaga(),
    getAllTopChatroomSaga(),
    getCoinSaga(),
    getBackgroundImageSaga(),
    getFrameSaga(),
    buyFrameSaga(),
    buyBackgroundSaga(),
    activeFrameSaga(),
    activeBackgroundSaga(),
    getEntrySaga(),
    buyEntriesSaga(),
    activeEntriesSaga(),
  ]);
}

export default rootSaga;
