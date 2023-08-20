import {
  Alert,
  BackHandler,
  Button,
  findNodeHandle,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  PermissionsAndroid,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ShareIcon from '../../assets/svg/ShareIcon';
import MenuIcon from '../../assets/svg/MenuIcon';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import {getImage} from '../../utils/getImage';
import WhiteBackArrow from '../../assets/svg/WhiteBackArrow';
import MusicIcon from '../../assets/svg/MusicIcon';
import ImageIcon from '../../assets/svg/ImageIcon';
import EmojiIcon from '../../assets/svg/EmojiIcon';
import SendIcon from '../../assets/svg/SendIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import GiftIcon from '../../assets/svg/GiftIcon';
import RightArrow from '../../assets/svg/RightArrow';
import TopSupporter from '../../assets/svg/TopSupporter';
import HomeFran from '../../assets/svg/HomeFran';
import HelpIcon from '../../assets/svg/HelpIcon';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {getId, getUsername} from '../../utils/localStorage';
import {
  deleteChatroom,
  followUser,
  getAllChatrooms,
  getChatroomData,
  getGifts,
  getGroupMessage,
  getMessage,
  getMyChatroom,
  getSticker,
  getUserChatroomData,
  getWallet,
  joinRoom,
  removeAudioChatroom,
  sendAudioRequest,
  sendCPRequest,
  sendWarRequest,
} from '../../redux/actions/action';
import {decrypted, encrypted} from '../../utils/encDecData';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoScenario,
  ZegoUpdateType,
} from 'zego-express-engine-reactnative';
// import {GROUP_VOICE_CALL_CONFIG} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import {ZegoExpressManager} from '../../ZegoExpressManager';
import {ZegoMediaOptions} from '../../ZegoExpressManager/index.entity';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import WarRoomIcon from '../../assets/svg/WarRoomIcon';
import GroupCoinIcon from '../../assets/svg/GroupCoinIcon';
import * as Progress from 'react-native-progress';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import AcceptButton from '../../assets/svg/AcceptButton';
import CancelButton from '../../assets/svg/CancelButton';
import {All_EMOJIS} from '../../utils/Emojis';
import FeaturePlusIcon from '../../assets/svg/FeaturePlusIcon';
import CPConnectionIcon from '../../assets/svg/CPConnectionIcon';
import MuteIcon from '../../assets/svg/MuteIcon';
import LeaveIcon from '../../assets/svg/LeaveIcon';
import ViewProfileIcon from '../../assets/svg/ViewProfileIcon';
import NextIcon from '../../assets/svg/NextIcon';
import FollowUserIcon from '../../assets/svg/FollowUserIcon';
import BestieIcon from '../../assets/svg/BestieIcon';
import FamilyIcon from '../../assets/svg/FamilyIcon';
import LoverIcon from '../../assets/svg/LoverIcon';
import Sward from '../../assets/svg/Sward';
import AddUserIcon from '../../assets/svg/AddUserIcon';
import TimerComponent from '../../components/TimerComponent';
import {useIsFocused} from '@react-navigation/native';
import RBSheetUserOption from '../../components/RBSheetUserOption';
import RBSheetMenuOption from '../../components/RBSheetMenuOption';
import RBSheetSendCp from '../../components/RBSheetSendCp';
import DownArrow from '../../assets/svg/DownArror';
import RBSheetPesonList from '../../components/RBSheetPesonList';
import RBSheetGroupList from '../../components/RBSheetGroupList';
import RBSheetBattle from '../../components/RBSheetBattle';
import RBSheetGift from '../../components/RBSheetGift';
import {SkypeIndicator} from 'react-native-indicators';
import RBSheetSticker from '../../components/RBSheetSticker';
import ExitOptionModal from '../../components/ExitOptionModal';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import AudioMuteIcon from '../../assets/svg/AudioMuteIcon';
import {socket} from '../../../App';
import VideoModal from '../../components/VideoModal';
import {showMessage} from 'react-native-flash-message';
import {getFont} from '../../utils/getFont';
import moment from 'moment';
import useKeyboard from '../../utils/useKeyboard';

const ChatRoom = ({navigation, route}) => {
  const {room_id, userId, from} = route.params;
  const {isKeyboardOpen} = useKeyboard();

  const [isMenuVisible, setMenuVisible] = useState(false);
  const refRBSheetList = useRef();
  const flatListView = useRef(null);

  const refRBSheetGift = useRef();
  const refRBSheetBreakup = useRef();
  // const refRBSheetGroupList = useRef();

  const [roomName, setRoomName] = useState('');

  const [chatRoomId, setChatRoomId] = useState('');
  const [chatroomData, setChatroomData] = useState('');
  const [flag, setFlag] = useState(false);

  const [userData, setUserData] = useState({});
  const [chatMessageList, setChatMessageList] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [message, setMessage] = useState('');
  const [isAdmin, setAdmin] = useState(0);
  const [cpInUse, setCpInUse] = useState(0);
  const [username, setUsername] = useState('');

  const [isOpenVideo, setOpenVideo] = useState({isOpen: false});
  const [isPlayingVideo, setPlayingVideo] = useState(false);

  var adminFlag = 1;

  const [cpId, setCpId] = useState('');

  const [audioPersonList, setAudioPersonList] = useState(null);
  const [mutePersonList, setMutePersonList] = useState([]);

  const [membersList, setMembersList] = useState([]);
  const [franchiseDetail, setFranchiseDetails] = useState([]);
  const [onlineMembersList, setOnlineMembersList] = useState([]);

  const [allMembersList, setAllMembersList] = useState([]);

  const [showAudioList, setShowAudioList] = useState(true);

  var localViewRef = React.createRef();

  var remoteViewRef = React.createRef();

  const [refreshScreen, setRefreshingScreen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [cpPopUp, setCpPopupVisible] = useState(false);
  const [audioRequestPopUp, setAudioRequestVisible] = useState(false);
  const [audioRequestData, setAudioRequestData] = useState(null);
  const [warModalVisible, setWarModalVisible] = useState(false);
  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [giftVisible, setGiftVisible] = useState(false);
  // const [isStickerVisible, setGiftVisible] = useState(false);

  const [balance, setBalance] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [warData, setWarData] = useState(null);
  const [warData1, setWarData1] = useState(null);

  const [emojiVisible, setEmojiVisible] = useState(false);
  const [stickerVisible, setStickerVisible] = useState(false);
  const [giftTo, setGiftTo] = useState(null);

  const [isBattleOpen, setIsBattleOpen] = useState(false);
  const [isOpenInviteList, setIsOpenInviteList] = useState(false);
  const [myGiftCoin, setMyGiftCoin] = useState(0);
  const [otherGiftCoin, setOtherGiftCoin] = useState(0);
  const [progressVal, setProgressVal] = useState(0.5);
  const [rbUserOptionOpen, setRBUserOptionOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCPOpen, setIsCPOpen] = useState(false);
  const [isGiftListOpen, setGiftPersonList] = useState(false);

  const [exitModalVisible, setExitModalVisible] = useState(false);

  const [winnerData, setWinnerData] = useState(null);

  const [timeList, setTimeList] = useState([
    {
      time: '10 Min',
    },
    {
      time: '20 Min',
    },
    {
      time: '30 Min',
    },
    {
      time: '1 Hour',
    },
  ]);

  const [chatroomList, setMyChatData] = useState(null);
  const [cpRelation, setCPRelation] = useState('Lover');
  const [optionUserData, setOptionUserData] = useState(null);

  const [categoriesList, setCategoriesList] = useState(null);
  const [categoriesListSticker, setCategoriesListSticker] = useState(null);

  const [giftList, setGiftList] = useState(null);
  const [stickerList, setStickerList] = useState(null);

  const [selectCateIndex, setSelectedIndex] = useState(0);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [warTime, setWarTime] = useState(0);
  const [warId, setWarId] = useState('');
  const [warRequestData, setWarRequestData] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledMute, setIsEnabledMute] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const isFocused = useIsFocused();

  const toggleSwitchMute = switchVal => {
    // setIsEnabledMute(previousState => !previousState);
    if (optionUserData == userId) {
      muteUser(!switchVal);
      setIsEnabledMute(switchVal);
    } else {
      var data = {
        _id: chatroomData._id,
        userId: optionUserData.userId._id,
        status: switchVal ? 1 : 0,
      };

      socket.emit('muteUser', data);
      setIsEnabledMute(switchVal);
    }
  };

  var flagDel = true;

  const setSelectedTag = time => {
    setSelectedTime(time);
    setRefreshingScreen(!refreshScreen);
  };

  const showEmoji = () => {
    Keyboard.dismiss();
    setEmojiVisible(!emojiVisible);
  };

  const showStickers = () => {
    Keyboard.dismiss();
    setStickerVisible(!stickerVisible);
  };

  const setMessageUser = msgData => {
    // console.log('MsgData==>', msgData);
    chatMessageList.reverse().push(msgData);
    // console.log('MsgData==>', chatMessageList);
    setChatMessageList(chatMessageList.reverse());
    setFlag(true);
    if (msgData.senderId._id == userId) {
      setBalance(msgData.senderId.walletPoints);
    }
    // setFlag(true);
    // handleScrollToEnd();
  };

  const dispatch = useDispatch();

  const getOnlineCount = members => {
    const online = members.filter(obj => obj.socketId !== '');
    setOnlineMembersList(online);
  };

  const callbackData = val => {
    // alert(JSON.stringify(val))
    console.log('WarDetail11111===>', JSON.stringify(val));
    // setFlag(!flag);

    if (audioPersonList == null) {
      setAudioPersonList(val.audioEnabledUsers);

      var member = val.members.filter(item => {
        return item.userId._id === userId;
      });

      setPlayingVideo(!isPlayingVideo);

      console.log('Get User Chatroom Data ===> ', member);

      setGiftTo(val.audioEnabledUsers[0]);

      setMembersList(val.noAudioEnabledUsers);

      setAllMembersList(val.members);

      getOnlineCount(val.members);

      setChatroomData(val.data);

      //  var cpOptionData = allMembersList.filter(item => {
      //    return item.userId._id === userId;
      //  });

      // console.log('isAdmin ===> ', member[0].isAdmin);

      adminFlag = member[0].isAdmin;

      setUserData(member[0]);

      // console.log('Admin Flag ===>', adminFlag);
      joinAudioRoom(
        room_id,
        member[0].zeoCloudToken,
        member[0].userId.userName,
        userId,
        member[0].isAdmin,
      );

      setAdmin(member[0].isAdmin);

      setCpInUse(member[0].userId.cpInUse);
    } else {
      console.log(val.audioEnabledUsers);
      setAudioPersonList(val.audioEnabledUsers);
      setGiftTo(val.audioEnabledUsers[0]);
      setMembersList(val.noAudioEnabledUsers);
      setAllMembersList(val.members);
      getOnlineCount(val.members);
    }

    setFranchiseDetails(val.myFranchise);

    if (Object.keys(val.data1).length != 0) {
      // console.log('WAR DETAIL ===> ', val.data1);
      var theDate = new Date(val.warDetails.startedAt);
      var data = theDate.toLocaleString();
      var cDate = new Date();
      // console.log('Create at Date===>', theDate, ' Current Data', cDate);
      var totalTime = cDate.getTime() - theDate.getTime();
      // var minutes =
      var minute = Math.floor(totalTime / 60000);
      var remainMinutes = val.warDetails.warTime - 1 - minute;
      var remainSecond = ((totalTime % 60000) / 1000).toFixed(0);
      // console.log('Total Time ===>', data, ' ', totalTime);
      console.log('Total Time ===>', remainMinutes, ' ', remainSecond);
      if (val.data1.chatRoomOne.chatRoom.chatRoomId == room_id) {
        var coinOne = val.data1.chatRoomOne.coinCount;
        var coinTwo = val.data1.chatRoomTwo.coinCount;

        if (coinOne > coinTwo) {
          console.log('1');
          var progress = (100 - val.data1.winningPercentage) / 100;
          setProgressVal(progress);
        } else {
          var progress = val.data1.winningPercentage / 100;
          setProgressVal(progress);
        }

        setMyGiftCoin(coinOne);
        setOtherGiftCoin(coinTwo);
      } else {
        var coinTwo = val.data1.chatRoomOne.coinCount;
        var coinOne = val.data1.chatRoomTwo.coinCount;
        if (coinOne > coinTwo) {
          var progress = (100 - val.data1.winningPercentage) / 100;
          setProgressVal(progress);
        } else {
          var progress = val.data1.winningPercentage / 100;
          setProgressVal(progress);
        }
        // setProgressVal(progress);
        setMyGiftCoin(coinOne);
        setOtherGiftCoin(coinTwo);
      }

      console.log('Audio Person ===> ', val.data1);
      setGiftTo(val.audioEnabledUsers[0]);
      setWarData(val.warDetails);
      setWarData1(val.data1);
      setWarId(val.warDetails._id);
      setMinutes(remainMinutes);
      setSeconds(60 - remainSecond);

      setFranchiseDetailsval;
    }
  };

  // const joinCallback = data => {
  //   // console.log('Val==>', data);
  //   setRoomData(data);

  //   joinAudioRoom(
  //     room_id,
  //     data.token.token,
  //     data.token.userData.userName,
  //     data.token.userData.userId,
  //   );
  // };

  const cpRequestCallback = val => {
    if (val.status == 1) {
      showToast('CP Request Sent');
    }
  };
  const followUserCallback = val => {
    if (val.status == 1) {
      // refRBSheetUserOption.current.close();
      setRBUserOptionOpen(false);
      showToast('User Followed');
    }
  };

  const cpRequest = () => {
    // refRBSheetSendCP.current.close();
    setIsCPOpen(false);
    var data = {
      userId: userId,
      otherUserId: optionUserData.userId._id,
      chatRoomId: chatroomData._id,
      cpType: cpRelation,
      price: '3499',
    };
    // console.log('CPData ===> ', data);
    socket.emit('cp_send', data);
    // dispatch(sendCPRequest({payload, cpRequestCallback}));
  };

  const followUserApi = () => {
    // console.log('USER DATA==>', optionUserData);
    const payload = {
      userId: optionUserData.userId._id,
    };

    dispatch(followUser({payload, followUserCallback}));
  };

  const onSupports = () => {
    // refRBSheet.current.close();
    setIsMenuOpen(false);
    navigation.navigate('PerformanceSupporter', {roomId: room_id});
  };

  const onFranchise = () => {
    // refRBSheet.current.close();
    setIsMenuOpen(false);
    navigation.navigate('Franchise');
  };

  const roomRefresh = () => {
    // refRBSheet.current.close();
    setIsMenuOpen(false);
    callbackRequest('');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://syizu.page.link/6BG2?chatRoomId=${room_id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      showToast(error.message);
    }
  };

  const openSheetCP = () => {
    // refRBSheetUserOption.current.close();
    if (cpInUse == 0) {
      setRBUserOptionOpen(false);
      // refRBSheetSendCP.current.open();
      console.log('CP Send');
      setIsCPOpen(true);
    } else {
      showToast('You are already in CP');
    }
  };

  const openUserOption = (data, from) => {
    console.log('UserId Audio ==>', data);

    var dataOption = audioPersonList.filter(item => {
      console.log('UserId AudioData  ==>', item.userId._id);
      return item.userId._id === data;
    });

    if (dataOption.length == 0) {
      dataOption = allMembersList.filter(item => {
        return item.userId._id === data;
      });
    }

    // console.log('UserId AudioData  ==>', dataOption);

    console.log('Under Audio ==>', dataOption);

    console.log('CPINUSE ===> ', cpInUse);

    if (dataOption.length > 0) {
      setOptionUserData(dataOption[0]);

      setRBUserOptionOpen(true);
    }
  };

  const openBreakupCp = () => {
    setRBUserOptionOpen(false);
    refRBSheetBreakup.current.open();
  };

  useEffect(() => {
    dispatch(getWallet({callbackWallet}));
  }, []);

  const callbackWallet = val => {
    // console.log('Wallet ===> ', val);
    setBalance(val.data.walletPoints);
  };

  const messageCallback = val => {
    // console.log('Messages ===>', val.data);

    // console.log('Messages ===> 1', val.data);

    // setChatMessageList(val.data);

    // setFlag(false);

    // // setRefresh(true);
    // if (chatMessageList.length == 0) {
    //   for (let i = 0; i < val.data.length; i++) {
    //     chatMessageList.push(val.data[i]);
    //     // setId(val.data._id);
    //     if (i == val.data.length - 1) {
    //       setChatMessageList(chatMessageList);
    //     }
    //   }
    // } else {
    //   if (chatMessageList.length < val.data.length) {
    //     for (let i = 0; i < val.data.length; i++) {
    //       chatMessageList.push(val.data[i]);
    //       // setId(val.data._id);
    //       if (i == val.data.length - 1) {
    //         setChatMessageList(chatMessageList);
    //         // handleScrollToEnd();
    //       }
    //     }
    //   }
    // }

    // setRefresh(false);
    setFlag(false);

    // handleScrollToEnd();
    // console.log('ChatMessage ====> ', chatMessageList);

    for (let i = 0; i < val.data.length; i++) {
      chatMessageList.push(val.data[i]);
      if (i == val.data.length - 1) {
        setChatMessageList(chatMessageList.reverse());
        setFlag(true);
      }
    }
    // chatMessageList(val.data.messages);
    // setFlag(!flag);
  };

  useEffect(() => {
    if (isFocused) {
      var payload = {roomID: room_id};

      // console.log('RoomID ===>', payload);
      // setFlag(!flag);

      dispatch(getUserChatroomData({payload, callbackData}));
      const backAction = () => {
        setExitModalVisible(true);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
    // getToken();
  }, [isFocused]);

  useEffect(() => {
    console.log(
      'MyGiftcoin ==> ',
      myGiftCoin,
      ' OtherGiftCoin ===> ',
      otherGiftCoin,
    );
  }, [myGiftCoin, otherGiftCoin]);

  useEffect(() => {
    // console.log('RoomId==>', room_id);
    getUsername(setUsername);

    // const request = {
    //   chatId: room_id,
    // };

    grantPermissions();

    console.warn('init SDK');
    const profile = {
      appID: 720286095,
      scenario: ZegoScenario.General,
    };
    ZegoExpressManager.createEngine(profile).then(async () => {
      console.warn('ZegoExpressEngine created!');
      // Register callback
      registerCallback();

      // dispatch(joinRoom({payload, joinCallback}));

      var payload = {roomID: room_id};

      // console.log('RoomID ===>', payload);

      // dispatch(getUserChatroomData({payload, callbackData}));

      // dispatch(getChatroomData({callbackData}));
      // Join room and wait...
      // this.joinRoom();
    });

    const payload = {
      chatRoomId: room_id,
    };

    // console.log('RoomId==>', payload);

    return () => {
      ZegoExpressManager.instance().leaveRoom();

      console.log(
        'removeFromAudioChatRoom ====> ',
        isAdmin,
        '       ',
        adminFlag,
      );

      // if (isAdmin != 1 && adminFlag != 1) {
      var data = {
        chatRoomId: room_id,
        userId: userId,
      };

      console.log('removeFromAudioChatRoom ===> ', data);

      socket.emit('removeFromAudioChatRoom', data);
      // }
      var data = {
        userId: userId,
        chatRoomId: room_id,
      };
      socket.emit('user_disconnect', data);
    };
  }, []);

  var isMute = true;

  const exitModel = () => {
    socket.disconnect();
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connect=====>');
    });
    socket.on('disconnect', () => {
      console.log('disconnect=====>');
    });
    // // setIsConnected(true);
    var data = {
      userId: userId,
      chatRoomId: room_id,
    };

    console.log('SocketUserId', userId);

    console.log('touch_server', data);

    // if (!socket.connected) {
    //   console.log(
    //     'Connected .......................................................',
    //   );
    socket.emit('touch_server', data);
    // }

    // console.log('Hit socket');

    socket.on('war_request_sent', data => {
      console.log('war_request_sent', data);
      setWarTime(data.warRoom.warTime);
      setWarId(data.warRoom._id);
      // refRBSheetGroupList.current.close();
    });

    socket.on('war_started', data => {
      console.log('war_started', data);
      setWarData(data.warDetails);
      setWarData1(data.data1);

      setMinutes(data.warDetails.warTime - 1);
      setSeconds(59);
      setIsActive(true);
      setMyGiftCoin(0);
      setOtherGiftCoin(0);
    });

    socket.on('war_request', data => {
      console.log('war_request', data);
      setWarRequestData(data);
      setWarTime(data.warRoom.warTime);
      setWarId(data.warRoom._id);

      setModalVisible(!modalVisible);
      // refRBSheetGroupList.current.close();
    });
    socket.on('war_coin_data', data => {
      // setRefreshingScreen(!refreshScreen);
      // console.log('war_coin_data My ==> ', data, '   ', chatRoomId);
      if (data.chatRoomOne.chatRoom.chatRoomId == room_id) {
        console.log('war_coin_data My ==> ', data, '   ', chatroomData._id);

        var progress = data.chatRoomOne.winningPercentage / 100;
        setProgressVal(progress);

        setMyGiftCoin(data.chatRoomOne.coinCount);

        setOtherGiftCoin(data.chatRoomTwo.coinCount);
      }
      if (data.chatRoomTwo.chatRoom.chatRoomId == room_id) {
        console.log('war_coin_data  other==> ', data, '   ', chatroomData._id);

        setMyGiftCoin(data.chatRoomTwo.coinCount);

        setOtherGiftCoin(data.chatRoomOne.coinCount);

        var progress = data.chatRoomTwo.winningPercentage / 100;
        setProgressVal(progress);
      }
      setRefreshingScreen(!refreshScreen);
    });

    socket.on('mute_by_admin', data => {
      console.log('mute_by_admin', data);
      setAudioPersonList(data.audioEnabledUsers);

      var dataOption = data.audioEnabledUser.filter(item => {
        return item.userId._id === userId;
      });

      var muted = dataOption.isMute == 1 ? true : false;

      if (isMute) {
        if (muted) {
          muteUser(false);
          isMute = false;
        }
      } else {
        if (!muted) {
          muteUser(true);
          isMute = true;
        }
      }
    });

    socket.on('new_member_joined', data => {
      console.log('new_member_joined', data.members);
      setAllMembersList(data.members);
      getOnlineCount(data.members);

      let newUser = data.userEntry;
      console.log('new_member_joined11', newUser);
      if (newUser?.entryImage && newUser?.entryImage != '') {
        setOpenVideo({
          ...isOpenVideo,
          isOpen: true,
          url: newUser?.entryImage,
          type: newUser?.entryType,
        });
      }
    });

    socket.on('refresh_member_list', data => {
      // console.log('refresh_member_list', data);
      setAudioPersonList(data.audioEnabledUsers);
    });

    socket.on('war_ended', data => {
      console.log(data);
      setWinnerData(data);
      setSeconds(0);
      setIsActive(false);
    });
    socket.on('receive_message', data => {
      // console.log('receive_message', data);
      setFlag(false);
      setMessageUser(data);
    });
    socket.on('cp_request', data => {
      // console.log('cp_request ==> ', data);
      setCpId(data);
      setCpPopupVisible(!cpPopUp);
    });
    socket.on('cp_request_sent', data => {
      // console.log('cp_request_sent ==> ', data);
    });
    socket.on('receive_message_gifts', data => {
      // console.log('receive_message_gifts ==> ', data);
    });
    socket.on('cp_terminated', data => {
      console.log('cp_terminated ==> ', data);
      // setAllMembersList(data.members);
      setAudioPersonList(data.audioEnabledUsers);
      setMembersList(data.noAudioEnabledUsers);
      setAllMembersList(data.members);
      showToast('Your Cp terminated');
      setRefreshingScreen(!refreshScreen);
    });
    socket.on('cp_started', data => {
      console.log('cp_started ==> ', data);
      // setAllMembersList(data.members);
      setAudioPersonList(data.audioEnabledUsers);
      // setMembersList(data.noAudioEnabledUsers);
      setAllMembersList(data.members);
      showToast('Your Cp started');
      // setRefreshingScreen(!refreshScreen);
    });

    socket.on('t222', data => {
      console.log('t222');
    });

    socket.on('cp_not_sent_due_to_coin', data => {
      console.log('cp_not_sent_due_to_coin ==> ', data.members);
      navigation.navigate('WalletScreen');
    });
    socket.on('less_coin', data => {
      console.log('cp_not_sent_due_to_coin ==> ', data);
      navigation.navigate('WalletScreen');
    });
    socket.on('cp_rejected', data => {
      console.log('cp_rejected ==> ', data);
      showToast('Your cp request cancelled by other user');
      // navigation.navigate('WalletScreen');
    });
    socket.on('war_rejected', data => {
      console.log('war_rejected ==> ', data);
      showToast('Your war request cancelled by other user');
      // navigation.navigate('WalletScreen');
    });
    socket.on('audio_rejected', data => {
      console.log('audio_rejected ==> ', data);
      showToast('Your audio request cancelled');
      // navigation.navigate('WalletScreen');
    });

    socket.on('audio_list_after_remove_user', data => {
      // console.log(
      //   'audio_list_after_remove_user ==> ',
      //   data.noAudioEnabledUsers,
      // );
      setAudioPersonList(data.audioEnabledUsers);
      setMembersList(data.noAudioEnabledUsers);
      setAllMembersList(data.members);
      getOnlineCount(data.members);
      if (data.removedUser._id == userId) {
        muteUser(false);
      }
    });
    socket.on('delete_chat_room', data => {
      console.log('delete_chat_room ==> ', data);

      if (flagDel) {
        if (data.chatRoomId == room_id) {
          showToast('Chatroom Deleted');
          navigation.goBack();
          flagDel = false;
        }
      }
      // setDeleteFlag(false);
    });
    socket.on('acceptAudioRequest', data => {
      console.log('acceptAudioRequest Admin==> ', data.audioEnabledUsers);
      if (data.status != 0) {
        // setAudioPersonList('Audio ENABLE DATA ===> ', data.audioEnabledUser);
        setMembersList(data.noAudioEnabledUsers);
        setAudioPersonList(data.audioEnabledUsers);
        muteUser(true);
        setIsEnabledMute(false);
      } else {
        // setAudioPersonList(data.audioEnabledUsers);
        // setMembersList(data.noAudioEnabledUsers);
        showToast('Audio request canceled by other user');
        refRBSheetList.current.close();
      }
    });
    socket.on('refreshSendRequestForAdmin', data => {
      console.log('acceptAudioRequest Admin==> ', data);
      if (isAdmin == 1) {
        setAudioPersonList(data.audioEnabledUsers);
        setMembersList(data.noAudioEnabledUsers);
      }
    });
    socket.on('receiveAudioRequest', data => {
      console.log('receiveAudioRequest ==> ', data);
      setAudioRequestData(data);
      setAudioRequestVisible(!audioRequestPopUp);
    });
    socket.on('removed_from_group', data => {
      console.log('channel-  removed_from_group ==> ', data);
      if (data.chatRoomId == room_id) {
        showToast('You are blocked by admin');
        navigation.goBack();
      }
      // setAudioRequestData(data);
      // setAudioRequestVisible(!audioRequestPopUp);
    });
    socket.on('enter_user', data => {
      // console.log('enter_user ==> ', data.members);
      setAudioPersonList(data.audioEnabledUsers);
      setMembersList(data.noAudioEnabledUsers);
      setAllMembersList(data.members);
      getOnlineCount(data.members);

      let newUser = data.userEntry;
      console.log('enter_user ==> ', data);

      if (newUser?.entryImage && newUser?.entryImage != '') {
        setOpenVideo({
          ...isOpenVideo,
          isOpen: true,
          url: newUser?.entryImage,
          type: newUser?.entryType,
        });
      }
      let fullName = newUser?.firstName + ' ' + newUser?.lastName;
      fullName = fullName.trim() || 'User';
      showMessage({
        duration: 4000,
        message: fullName + ' has entered the chatroom.', //
        icon: props => (
          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: newUser?.profileImage,
            }}
          />
        ),
        type: 'info',
        style: {
          marginTop: 25,
          marginHorizontal: 15,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
        textStyle: {color: '#000'},

        titleStyle: {
          color: '#000',
          fontSize: 14,
          fontWeight: '400',
          // textAlign: 'center',
          marginLeft: 15,
        },
      });

      // if (data.chatRoomId == room_id) {
      //   showToast('You are blocked by admin');
      //   navigation.goBack();
      // }
      // setAudioRequestData(data);
      // setAudioRequestVisible(!audioRequestPopUp);
    });
  }, [socket]);

  useEffect(() => {
    console.log('WarId ===> ', warId);
  }, [warId]);

  useEffect(() => {
    dispatch(getGifts({callbackGifts}));
  }, []);

  useEffect(() => {
    var payloadMessage = {roomId: room_id, skip: 50};

    console.log('Group Message Payload ===> ', payloadMessage);

    dispatch(getGroupMessage({payloadMessage, messageCallback}));
  }, []);

  useEffect(() => {
    winnerData != null ? setWinnerModalVisible(true) : '';
  }, [winnerData]);

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds - 1);
  //     }, 1000);
  //   }
  //   if (isActive && seconds == 0) {
  //     // console.log(seconds);
  //     if (minutes == 0) {
  //       setIsActive(false);
  //       clearInterval(interval);
  //     } else {
  //       setMinutes(minutes => minutes - 1);
  //       setSeconds(59);
  //     }
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('Open');
        setEmojiVisible(false);
        setStickerVisible(false);
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // console.log('Close');
        // setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const cpTerminated = () => {
    var data = {
      _id: optionUserData.cpDetails._id,
    };
    socket.emit('cp_terminate', data);
    refRBSheetBreakup.current.close();
  };

  const cpAcceptReject = status => {
    var data = {
      status: status,
      _id: cpId.cpRoom._id,
    };
    socket.emit('cp_accept_reject', data);
    setCpPopupVisible(!cpPopUp);
  };

  const audioRequestAcceptReject = (status, userId) => {
    var data = {
      chatRoomId: room_id,
      userId: audioRequestData != null ? audioRequestData.user._id : userId,
      userIdNew: audioRequestData != null ? audioRequestData.userIdNew : '',
      type: isAdmin == 1 ? 1 : 2,
      status: status,
    };
    console.log('joinAudioRequest ===> ', data);
    socket.emit('joinAudioRequest', data);
    if (audioRequestPopUp) {
      setAudioRequestVisible(!audioRequestPopUp);
    }
  };

  const joinAudioRoom = (roomID, token, userName, userID, checkAdmin) => {
    console.log('Join room: ', roomID, token, userName, userID, checkAdmin);
    ZegoExpressManager.instance()
      .joinRoom(
        roomID,
        token,
        {userID: userID, userName: userName},
        // isAdmin == 1?m
        [
          ZegoMediaOptions.PublishLocalAudio,
          ZegoMediaOptions.PublishLocalVideo,
          ZegoMediaOptions.AutoPlayAudio,
          // ZegoMediaOptions.AutoPlayVideo,
        ],
        // : [
        //     // ZegoMediaOptions.PublishLocalAudio,
        //     ZegoMediaOptions.PublishLocalVideo,
        //     ZegoMediaOptions.AutoPlayVideo,
        //   ],
      )
      .then(result => {
        if (result) {
          console.warn('Login successful');
          // ZegoExpressManager.instance().setLocalVideoView(
          //   findNodeHandle(localViewRef.current),
          // );
          if (checkAdmin == 0) {
            muteUser(false);
          }
        } else {
          console.warn('Login failed!', result);
        }
      });
  };

  const muteUser = muteVal => {
    console.log('Audio admin ===> ', muteVal);
    ZegoExpressManager.instance().enableMic(muteVal);
  };

  const registerCallback = () => {
    // When other user join in the same room, this method will get call
    // Read more doc: https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate
    ZegoExpressManager.instance().onRoomUserUpdate(
      (updateType, userList, roomID) => {
        console.warn('out roomUserUpdate', updateType, userList, roomID);
        // if (updateType == ZegoUpdateType.Add) {
        //   console.log(
        //     '&&&&&&&&&',
        //     remoteViewRef,
        //     findNodeHandle(remoteViewRef),
        //   );
        //   userList.forEach(userID => {
        //     ZegoExpressManager.instance().setRemoteVideoView(
        //       userID,
        //       findNodeHandle(remoteViewRef),
        //     );
        //   });
        // }
      },
    );
    ZegoExpressManager.instance().onRoomUserDeviceUpdate(
      (updateType, userID, roomID) => {
        console.warn('out roomUserDeviceUpdate', updateType, userID, roomID);
      },
    );
    ZegoExpressManager.instance().onRoomTokenWillExpire(
      async (roomID, remainTimeInSecond) => {
        console.warn('out roomTokenWillExpire', roomID, remainTimeInSecond);
        const token = (await this.generateToken()).token;
        ZegoExpressEngine.instance().renewToken(roomID, token);
      },
    );
  };

  const grantPermissions = async () => {
    // Android: Dynamically obtaining device permissions
    if (Platform.OS === 'android') {
      // Check if permission granted
      let grantedAudio = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      let grantedCamera = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const ungrantedPermissions = [];
      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;
        if (!isAudioGranted) {
          ungrantedPermissions.push(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
        }
        if (!isVideoGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
      } catch (error) {
        ungrantedPermissions.push(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      }
      // If not, request it
      PermissionsAndroid.requestMultiple(ungrantedPermissions).then(data => {
        console.warn('requestMultiple', data);
      });
    }
  };

  const sendGift = (message, type, image) => {
    // refRBSheetGift.current.close();

    if (seconds == 0) {
      // if (giftFrom) {
      //   var data = {
      //     userId: userId,
      //     message: message.toString().trim(),
      //     chatRoomId: room_id,
      //     type: type,
      //     image: image,
      //   };

      //   // console.log('Button', data);
      //   socket.emit('send_message', data);
      //   // setChatMessageList(chatMessageList);
      //   setMessage('');
      //   setGiftFrom(false);
      // } else {
      var data = {
        userId: userId,
        message: message.toString().trim(),
        chatRoomId: room_id,
        type: type,
        image: image,
        receiverId:
          giftTo != null ? giftTo.userId._id : audioPersonList[0].userId._id,
      };
      // console.log('Gift To ===> ', data);
      // console.log('Button', data);
      socket.emit('send_message', data);
      // }
    } else {
      // console.log('Gift To ===> ', giftTo);
      var data = {
        userId: userId,
        message: message.toString().trim(),
        chatRoomId: chatroomData._id,
        _id: warData._id,
        type: type,
        receiverId:
          giftTo != null ? giftTo.userId._id : audioPersonList[0].userId._id,
      };
      console.log('New Gift', data);
      socket.emit('send_message_gift_new', data);
    }
  };

  const sendPing = (message1, type, image) => {
    // socket.emit('t123', '');

    if (message1 != '') {
      var data = {
        userId: userId,
        message: message1.toString().trim(),
        chatRoomId: room_id,
        type: type,
        image: image,
      };

      console.log('Button', data);
      socket.emit('send_message', data);
      // setChatMessageList(chatMessageList);
      setMessage('');
      type == 3 ? setStickerVisible(false) : '';
    } else {
      showToast('Please type something');
    }
  };

  const callbackRequest = val => {
    // console.log('Val Request ===>', val);
    var payload = {roomID: room_id};

    dispatch(getUserChatroomData({payload, callbackData}));
  };

  const callBack = val => {
    // console.log('ValMyChatroom==>', val);
    setMyChatData(val);
  };

  const callbackGifts = val => {
    // console.log('Gift ===> ', Object.keys(val.data));
    var cateList = Object.keys(val.data);
    setCategoriesList(cateList);

    var giftListVal = Object.values(val.data);

    setGiftList(giftListVal);

    dispatch(getSticker({callbackSticker}));
  };

  const callbackSticker = val => {
    // console.log('Sticker ===> ', Object.keys(val.data));
    var cateList = Object.keys(val.data);
    setCategoriesListSticker(cateList);

    var stickerListVal = Object.values(val.data);

    setStickerList(stickerListVal);
  };

  const warRequestCallback = () => {};

  const sendRequestToAdmin = userId1 => {
    var data = {
      chatRoomId: room_id,
      userId: userId1,
      userIdNew: userId,
      status: 1,
      type: 2,
    };

    socket.emit('addAudioRequest', data);
    refRBSheetList.current.close();
    showToast('Request sent to admin');

    // console.log('Payload Chatroom === >', payload);

    // dispatch(sendAudioRequest({payload, callbackRequest}));
  };

  const sendRequest = (userId1, userName) => {
    var data = {
      chatRoomId: room_id,
      userId: userId1,
      userIdNew: userId,
      status: 1,
      type: 1,
    };

    socket.emit('addAudioRequest', data);
    refRBSheetList.current.close();
    showToast(`Request sent to ${userName}`);

    // console.log('Payload Chatroom === >', payload);

    // dispatch(sendAudioRequest({payload, callbackRequest}));
  };

  const handleClosePress = () => {
    if (selectedTime != '') {
      dispatch(getAllChatrooms({callBack}));
      // refRBSheetBattle.current.close();
      setIsBattleOpen(false);
      // refRBSheetGroupList.current.open();
      setIsOpenInviteList(true);
    } else {
      showToast('Select time First');
    }
  };

  const setWarRequest = ar => {
    const data = {
      status: ar,
      _id: warId,
    };

    // console.log('war_accept_reject ===> ', data);
    socket.emit('war_accept_reject', data);

    setIsActive(true);

    setModalVisible(!modalVisible);
  };

  const sendWarRequestAuto = (rivalId, mode) => {
    var time = selectedTime.split(' ');

    setIsBattleOpen(false);

    var timeVal = parseInt(time[0]);

    const data = {
      userId: userId,
      warRoomChatId: chatroomData._id,
      warOtherRoomChatId: rivalId,
      warTime: timeVal,
      warMode: mode,
    };

    console.log('war_start', data);
    socket.emit('war_start', data);
  };

  const sendWarRequestApi = (rivalId, mode) => {
    var time = selectedTime.split(' ');

    var timeVal = parseInt(time[0]);

    // refRBSheetGroupList.current.close();
    setIsOpenInviteList(false);

    const data = {
      userId: userId,
      warRoomChatId: chatroomData._id,
      warOtherRoomChatId: rivalId,
      warTime: timeVal,
      warMode: mode,
    };

    console.log('war_start', data);
    socket.emit('war_start', data);
  };

  const openGiftList = gift_from => {
    // refRBSheetGift.current.open();

    setGiftVisible(true);
    // dispatch(getGifts({callbackGifts}));
    setWarModalVisible(false);
    setGiftTo(optionUserData);
    if (!gift_from) {
      // refRBSheetUserOption.current.close();
      setRBUserOptionOpen(false);
    }
  };

  function convertUTCToLocalTime(dateString) {
    // var theDate = new Date(Date.parse(dateString));
    // theDate.toLocaleString();
    // var date = `${theDate.getDate()}-${
    //   theDate.getMonth() + 1
    // }-${theDate.getFullYear()}`;
    // // console.log(date);
    // return date;
    let date = moment(new Date(dateString)).format('hh:mm A, DD-MMM');
    return date;
  }

  const openUserProfile = () => {
    // refRBSheetUserOption.current.close();
    setRBUserOptionOpen(false);
    navigation.navigate('UserProfile', {
      userData: optionUserData.userId,
    });
  };
  const openProfile = userId => {
    // refRBSheetUserOption.current.close();
    refRBSheetList.current.close();
    navigation.navigate('UserProfile', {
      userData: userId,
    });
  };

  const setGiftCate = index => {
    setSelectedIndex(index);
    // setGiftList
  };

  const deleteChatroomApi = () => {
    var payload = {
      chatRoomId: room_id,
    };

    console.log('Delete Api', payload);

    dispatch(deleteChatroom({payload}));
  };

  const closeWarModel = () => {
    setWarModalVisible(false);
  };

  const leaveUserAudio = () => {
    var payload = {
      chatRoomId: room_id,
      userId: optionUserData.userId._id,
    };
    console.log('removeFromAudioChatRoom payload', payload);
    socket.emit('removeFromAudioChatRoom', payload);
    // refRBSheetUserOption.current.close();
    setRBUserOptionOpen(false);
  };

  const openOnlineMember = () => {
    // if (isAdmin === 1) {
    if (membersList.length > 0) {
      refRBSheetList.current.open();
    }
    // }
  };

  const openAddAudioList = () => {
    console.log(isAdmin);
    if (isAdmin === 1) {
      if (membersList.length > 0) {
        refRBSheetList.current.open();
      }
    } else {
      var dataOption = audioPersonList.filter(item => {
        return item.userId._id === userId;
      });

      console.log('dataOption ==> ', dataOption);

      dataOption.length > 0
        ? showToast('Already joined')
        : sendRequestToAdmin(userId);
    }
  };

  const goToAnotherChatroom = () => {
    // console.log('gotoanotherChatroom');
    navigation.goBack();
    navigation.navigate('Chatroom', {
      room_id:
        warData.warRoomChatId.chatRoomId == room_id
          ? warData.warOtherRoomChatId.chatRoomId
          : warData.warRoomChatId.chatRoomId,
      roomName:
        warData.warRoomChatId.chatRoomName == chatroomData.chatRoomName
          ? warData.warOtherRoomChatId.chatRoomName
          : warData.warRoomChatId.chatRoomName,
      userId: userId,
    });
  };

  const setGiftPersonListData = open => {
    if (open) {
      // console.log('Gift one');
      setGiftPersonList(!open);
    }
    setGiftPersonList(open);
  };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  const checkMemberExist = () => {
    if (isAdmin === 1) {
      showToast('There is no member available');
    } else {
      console.log('Existing Member=>', membersList);
      showToast('Already joined');
    }
  };

  const deleteUserFromChatroom = () => {
    var payload = {
      chatRoomId: room_id,
      userId: optionUserData.userId._id,
    };
    console.log('removeUserFromChatRoom payload', payload);
    socket.emit('removeUserFromChatRoom', payload);
    // refRBSheetUserOption.current.close();
    setRBUserOptionOpen(false);
  };

  const openHelp = () => {
    setIsMenuOpen(false);
    navigation.navigate('Help');
  };

  // const loadMoreMessages = () => {
  //   var count = chatMessageList.length + 10;

  //   // chatMessageList = [];

  //   for (let i = chatMessageList.length - 1; i > 0; i--) {
  //     chatMessageList.splice(i, 1);

  //     console.log(chatMessageList.length);

  //     setChatMessageList(chatMessageList);
  //     handleScrollToEnd();
  //   }

  //   var payloadMessage = {roomId: room_id, skip: count};

  //   console.log('Group Message Payload ===> ', payloadMessage);

  //   dispatch(getGroupMessage({payloadMessage, messageCallback}));
  // };

  const handleScrollToEnd = () => {
    if (flatListView != null) {
      const index = chatMessageList.length - 1;
      flatListView.current.scrollToIndex({index, animated: false});
    }
  };

  return (
    <View style={styles.containerStyle}>
      {audioPersonList != null ? (
        <ImageBackground
          style={styles.containerStyle}
          source={
            audioPersonList[0].userId.backgroundImage == ''
              ? getImage('ic_chat_bg')
              : {
                  uri: audioPersonList[0].userId.backgroundImage,
                }
          }>
          <ImageBackground
            source={{
              uri:
                audioPersonList[0].userId.backgroundImage != ''
                  ? ''
                  : chatroomData != ''
                  ? chatroomData.image
                  : '',
            }}
            style={{
              height: 220,
              backgroundColor:
                audioPersonList[0].userId.backgroundImage != ''
                  ? 'transparent'
                  : '#5F00BA',
            }}>
            <View style={styles.headerStyle}>
              <Image
                style={{width: 35, height: 35, borderRadius: 8}}
                source={{uri: chatroomData?.image}}
              />

              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.headerTextStyle} numberOfLines={1}>
                  {chatroomData.chatRoomName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 16,
                  }}
                  // onPress={() => openAddAudioList()}
                >
                  <Text
                    style={{
                      color: appColors.white,
                      fontSize: 8,
                      fontWeight: '400',
                    }}>
                    Id: {chatroomData?.chatRoomId}
                  </Text>
                  <TouchableOpacity
                    onPress={() => openOnlineMember()}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 7, height: 10, marginLeft: 5}}
                      source={getImage('ic_online_user')}
                    />
                    <Text
                      style={{
                        color: appColors.white,
                        fontSize: 8,
                        fontWeight: '400',
                      }}>
                      {'  '}
                      {onlineMembersList.length}
                    </Text>
                  </TouchableOpacity>
                  {franchiseDetail != null &&
                  Object.keys(franchiseDetail).length > 0 ? (
                    <Text
                      style={{
                        color: appColors.white,
                        marginLeft: 10,
                        backgroundColor: appColors.light_purple,
                        paddingHorizontal: 4,
                        borderRadius: 3,
                      }}>
                      {franchiseDetail.franchiseId.name}
                    </Text>
                  ) : (
                    ''
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={{marginEnd: 16}}
                onPress={() => onShare()}>
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                onPress={() => setExitModalVisible(true)}>
                <Image source={getImage('el_off')} />
              </TouchableOpacity>
            </View>
            {audioPersonList != null ? (
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                {audioPersonList.length > 0 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() => {
                      openUserOption(audioPersonList[0].userId._id, 'audio');
                    }}>
                    {audioPersonList[0].userId.profileImage != '' ? (
                      audioPersonList[0].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[0].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[0].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[0].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <View>
                        <DummyUserImage height={50} width={50} />
                      </View>
                    )}
                    {audioPersonList[0].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text style={styles.userText} numberOfLines={2}>
                      {audioPersonList[0].userId.userName}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'0'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 1 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[1].userId._id, 'audio')
                    }>
                    {audioPersonList[1].userId.profileImage != '' ? (
                      audioPersonList[1].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[1].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[1].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[1].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[1].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text style={styles.userText} numberOfLines={2}>
                      {audioPersonList[1].userId.userName}\{' '}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'1'} />
                  </TouchableOpacity>
                )}

                {audioPersonList.length > 2 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[2].userId._id, 'audio')
                    }>
                    {audioPersonList[2].userId.profileImage != '' ? (
                      audioPersonList[2].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[2].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[2].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[2].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[2].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[2].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'2'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 3 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[3].userId._id, 'audio')
                    }>
                    {audioPersonList[3].userId.profileImage != '' ? (
                      audioPersonList[3].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[3].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[3].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[3].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[3].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[3].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'3'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 4 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[4].userId._id, 'audio')
                    }>
                    {audioPersonList[4].userId.profileImage != '' ? (
                      audioPersonList[4].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[4].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[4].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[4].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[4].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[4].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'4'} />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              ''
            )}
            {audioPersonList != null ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}>
                {audioPersonList.length > 5 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[5].userId._id, 'audio')
                    }>
                    {audioPersonList[5].userId.profileImage != '' ? (
                      audioPersonList[5].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[5].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[5].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[5].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[5].isMute ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[5].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'5'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 6 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[6].userId._id, 'audio')
                    }>
                    {audioPersonList[6].userId.profileImage != '' ? (
                      audioPersonList[6].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[6].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[6].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[6].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[6].isMute == 1 ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[6].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'6'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 7 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[7].userId._id, 'audio')
                    }>
                    {audioPersonList[7].userId.profileImage != '' ? (
                      audioPersonList[7].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[7].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[7].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[7].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[7].isMute ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[7].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'7'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 8 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[8].userId._id, 'audio')
                    }>
                    {audioPersonList[8].userId.profileImage != '' ? (
                      audioPersonList[8].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[8].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[8].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[8].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[8].isMute ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[8].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'8'} />
                  </TouchableOpacity>
                )}
                {audioPersonList.length > 9 ? (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      openUserOption(audioPersonList[9].userId._id, 'audio')
                    }>
                    {audioPersonList[9].userId.profileImage != '' ? (
                      audioPersonList[9].userId.frameImage != '' ? (
                        <ImageBackground
                          source={{uri: audioPersonList[9].userId.frameImage}}
                          style={styles.frameView}>
                          <Image
                            source={{
                              uri: audioPersonList[9].userId.profileImage,
                            }}
                            style={styles.frameImage}
                          />
                        </ImageBackground>
                      ) : (
                        <Image
                          source={{uri: audioPersonList[9].userId.profileImage}}
                          style={styles.imageStyle}
                        />
                      )
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    {audioPersonList[9].isMute ? (
                      <View style={{marginTop: -35, marginLeft: 12}}>
                        <AudioMuteIcon />
                      </View>
                    ) : (
                      ''
                    )}
                    <Text numberOfLines={2} style={styles.userText}>
                      {audioPersonList[9].userId.userName}
                      {/* UserName */}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      marginTop: 10,
                      marginHorizontal: 10,
                      alignContent: 'center',
                    }}
                    onPress={() =>
                      membersList.length > 0
                        ? openAddAudioList()
                        : checkMemberExist()
                    }>
                    <AddUserIcon title={'9'} />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              ''
            )}
          </ImageBackground>
          {seconds > 0 && isActive ? (
            <View
              style={{
                backgroundColor: appColors.brown,
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TimerComponent
                minutes={minutes}
                seconds={seconds}
                // myWarCoin={myGiftCoin}
                // otherWarCoin={otherGiftCoin}
              />

              {/* <Text style={{color: appColors.white}}>
            Time Left {minutes}: {seconds}
          </Text> */}
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                {warData1 != null ? (
                  <TouchableOpacity>
                    {warData1.chatRoomOne.chatRoom.chatRoomId == room_id ? (
                      warData1.chatRoomOne.userDetails.profileImage != '' ? (
                        <Image
                          style={{height: 50, width: 50, borderRadius: 25}}
                          source={{
                            uri: warData1.chatRoomOne.userDetails.profileImage,
                          }}
                        />
                      ) : (
                        <DummyUserImage height={50} width={50} />
                      )
                    ) : warData1.chatRoomTwo.userDetails.profileImage != '' ? (
                      <Image
                        style={{height: 50, width: 50, borderRadius: 25}}
                        source={{
                          uri: warData1.chatRoomTwo.userDetails.profileImage,
                        }}
                      />
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                  </TouchableOpacity>
                ) : (
                  <DummyUserImage height={50} width={50} />
                )}
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Progress.Bar
                    progress={progressVal}
                    width={220}
                    style={{marginTop: 10, marginHorizontal: 5}}
                    unfilledColor={appColors.yellow}
                    borderWidth={0}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginHorizontal: 5,
                    }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Image
                        source={getImage('coin')}
                        style={{height: 20, width: 20}}
                      />
                      <Text style={{color: appColors.white, marginLeft: 2}}>
                        {myGiftCoin}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: appColors.white,
                          marginLeft: 2,
                          alignSelf: 'flex-end',
                        }}>
                        {otherGiftCoin}
                      </Text>
                      <Image
                        source={getImage('coin')}
                        style={{height: 20, width: 20}}
                      />
                    </View>
                  </View>
                </View>
                {warData1 != null ? (
                  <TouchableOpacity onPress={() => goToAnotherChatroom()}>
                    {warData1.chatRoomOne.chatRoom.chatRoomId != room_id ? (
                      warData1.chatRoomOne.userDetails.profileImage != '' ? (
                        <Image
                          style={{height: 50, width: 50, borderRadius: 25}}
                          source={{
                            uri: warData1.chatRoomOne.userDetails.profileImage,
                          }}
                        />
                      ) : (
                        <DummyUserImage height={50} width={50} />
                      )
                    ) : warData1.chatRoomTwo.userDetails.profileImage != '' ? (
                      <Image
                        style={{height: 50, width: 50, borderRadius: 25}}
                        source={{
                          uri: warData1.chatRoomTwo.userDetails.profileImage,
                        }}
                      />
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                  </TouchableOpacity>
                ) : (
                  <DummyUserImage height={50} width={50} />
                )}
              </View>
            </View>
          ) : (
            ''
          )}

          {/* <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{roomName}</Text>
      </View> */}

          <ZegoTextureView
            ref={remoteViewRef}
            // @ts-ignore
            style={styles.playView}
          />

          {/* {chatMessageList != null ? ( */}
          <FlatList
            ref={flatListView}
            data={chatMessageList}
            style={{margin: 8}}
            showsVerticalScrollIndicator={false}
            // getItemLayout={(data, index) => ({
            //   length: 100,
            //   offset: 100 * index,
            //   index,
            // })}
            // initialNumToRender={0}
            // initialScrollIndex={chatMessageList.length - 1}
            // onScrollToIndexFailed={info => {
            //   const wait = new Promise(resolve => setTimeout(resolve, 500));
            //   wait.then(() => {
            //     flatList.current?.scrollToIndex({
            //       index: info.index,
            //       animated: true,
            //     });
            //   });
            // }}
            inverted
            // refreshing={isRefresh}
            // onRefresh={() => loadMoreMessages()}
            // onScrollToTop={() => loadMoreMessages()}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 16,
                }}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => openUserOption(item.senderId._id, 'message')}>
                  {item.senderId.profileImage != '' &&
                  item.senderId.profileImage != null ? (
                    <Image
                      source={{uri: item.senderId.profileImage}}
                      style={styles.imageStyle}
                    />
                  ) : (
                    <DummyUserImage height={50} width={50} />
                  )}
                  {/* <Text
                  style={{
                    backgroundColor: appColors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 8,
                    marginTop: -10,
                    color: appColors.white,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  
                </Text> */}
                </TouchableOpacity>
                <View style={{margin: 10, flex: 1}}>
                  <Text
                    style={{
                      color: appColors.white,
                      fontWeight: '400',
                      fontSize: 12,
                      fontFamily: getFont.Rochester,
                    }}>
                    {item.senderId.userName}
                  </Text>
                  <View
                    style={{
                      padding: 10,
                      // backgroundColor: appColors.light_grey,
                      backgroundColor: 'rgba(52, 52, 52, 0.4)',
                      borderTopEndRadius: 8,
                      borderBottomStartRadius: 8,
                      borderBottomEndRadius: 8,
                      marginRight: 8,
                    }}>
                    {item.message.includes('.jpg') ||
                    item.message.includes('.png') ? (
                      <View style={{flexDirection: 'column'}}>
                        <Image
                          resizeMode="contain"
                          source={{uri: item.message}}
                          style={{
                            padding: 20,
                            height: 70,
                            width: 70,
                          }}
                        />
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontFamily: getFont.Rochester,
                              color: appColors.white,
                              fontSize: 10,
                            }}>
                            Send to
                          </Text>
                          {Object.keys(item).includes('receiverId') ? (
                            <Text
                              style={{
                                color: appColors.white,
                                fontWeight: '500',
                                marginLeft: 4,
                                fontFamily: getFont.Rochester,
                                fontSize: 10,
                              }}>
                              {item.receiverId.userName}
                            </Text>
                          ) : (
                            ''
                          )}
                        </View>
                      </View>
                    ) : (
                      <Text
                        style={{
                          color: appColors.white,
                          fontWeight: '400',
                          fontSize: 14,
                          fontFamily: getFont.Rochester,
                        }}>
                        {item.message}
                      </Text>
                    )}
                    <Text
                      style={{
                        color: appColors.white,
                        alignSelf: 'flex-end',
                        fontSize: 10,
                        fontFamily: getFont.Rochester,
                      }}>
                      {convertUTCToLocalTime(item.createdAt)}
                      {/* {item.createdAt} */}
                      {/* {console.log(
                      new Date(Date.parse(item.createdAt)).toLocaleDateString,
                    )} */}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          {!stickerVisible ? (
            <View
              style={{
                alignSelf: 'flex-end',
                flexWrap: 'wrap',
                position: 'absolute',
                bottom: 60,
                padding: 10,
                alignItems: 'center',
              }}>
              {isAdmin == 1 && seconds == 0 ? (
                <TouchableOpacity onPress={() => setIsBattleOpen(true)}>
                  <WarRoomIcon />
                  <Text
                    style={{
                      color: appColors.primary,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    War Zone
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}

              {seconds > 0 ? (
                <TouchableOpacity
                  style={{marginTop: 5, alignItems: 'center'}}
                  onPress={() => setWarModalVisible(true)}>
                  <View style={{flexDirection: 'row'}}>
                    {warData1.chatRoomOne.chatRoom.chatRoomId == room_id ? (
                      warData1.chatRoomOne.userDetails.profileImage != '' ? (
                        <Image
                          style={{height: 26, width: 26, borderRadius: 13}}
                          source={{
                            uri: warData1.chatRoomOne.userDetails.profileImage,
                          }}
                        />
                      ) : (
                        <DummyUserImage height={26} width={26} />
                      )
                    ) : warData1.chatRoomTwo.userDetails.profileImage != '' ? (
                      <Image
                        style={{height: 26, width: 26, borderRadius: 13}}
                        source={{
                          uri: warData1.chatRoomTwo.userDetails.profileImage,
                        }}
                      />
                    ) : (
                      <DummyUserImage height={26} width={26} />
                    )}
                    <View style={{marginLeft: -12}}>
                      <Sward />
                    </View>
                    {warData1.chatRoomOne.chatRoom.chatRoomId != room_id ? (
                      warData1.chatRoomOne.userDetails.profileImage != '' ? (
                        <Image
                          style={{height: 26, width: 26, borderRadius: 13}}
                          source={{
                            uri: warData1.chatRoomOne.userDetails.profileImage,
                          }}
                        />
                      ) : (
                        <DummyUserImage height={26} width={26} />
                      )
                    ) : warData1.chatRoomTwo.userDetails.profileImage != '' ? (
                      <Image
                        style={{height: 26, width: 26, borderRadius: 13}}
                        source={{
                          uri: warData1.chatRoomTwo.userDetails.profileImage,
                        }}
                      />
                    ) : (
                      <DummyUserImage height={26} width={26} />
                    )}
                  </View>
                  <Text
                    style={{
                      color: appColors.black,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Running War
                  </Text>
                </TouchableOpacity>
              ) : (
                ''
              )}
              <TouchableOpacity style={{marginTop: 10, alignItems: 'center'}}>
                <GroupCoinIcon />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={getImage('coin')}
                    style={{height: 16, width: 16}}
                  />
                  <Text
                    style={{
                      color: appColors.primary,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {balance}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}
          <View>
            {emojiVisible ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={All_EMOJIS}
                style={{marginLeft: 10, height: 40, marginBottom: 20}}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      setMessage(message.toString() + item.toString())
                    }
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: appColors.white,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View />
            )}
            {/* {!flag ? ( */}
            <View
              style={{
                borderColor: appColors.grey,
                paddingLeft: 10,
                bottom: 10,
                marginHorizontal: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Say Hii.."
                placeholderTextColor={appColors.grey}
                style={{
                  flex: 1,
                  color: appColors.white,
                  backgroundColor: 'rgba(95, 0, 186, 0.5)',
                  borderRadius: 30,
                  paddingHorizontal: 12,
                  fontFamily: getFont.italicBold,
                }}
                value={message}
                onFocus={() => {
                  setEmojiVisible(false);
                }}
                onChangeText={val => setMessage(val)}
              />

              {!isKeyboardOpen ? (
                <TouchableOpacity
                  style={{marginLeft: 2}}
                  onPress={() => {
                    navigation.navigate('Message');
                  }}>
                  <Image source={getImage('ic_msg')} />
                </TouchableOpacity>
              ) : null}

              {isAdmin == 1 && !isKeyboardOpen ? (
                <TouchableOpacity
                  style={{padding: 2}}
                  onPress={async () => {
                    navigation.navigate('MusicListScreen');
                  }}>
                  <MusicIcon />
                </TouchableOpacity>
              ) : null}
              {!isKeyboardOpen ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginLeft: 2}}
                    //showStickers
                    onPress={() => {
                      setIsMenuOpen(true);
                      // showStickers()
                    }}>
                    <ImageIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 2}}
                    onPress={() => showEmoji()}>
                    <EmojiIcon />
                  </TouchableOpacity>
                </View>
              ) : null}
              {isKeyboardOpen ? (
                <TouchableOpacity
                  onPress={() => sendPing(message, 1, '')}
                  style={{
                    backgroundColor: appColors.primary,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                  }}>
                  <SendIcon />
                </TouchableOpacity>
              ) : (
                <View>
                  {audioPersonList != null && audioPersonList.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => openGiftList(true)}
                      style={{padding: 5}}>
                      <GiftIcon />
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
            </View>
            {/* ) : (
          ''
        )} */}

            {stickerVisible ? (
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={categoriesList}
                  style={{marginLeft: 10, marginHorizontal: 20}}
                  renderItem={({item, index}) => (
                    <View style={{flex: 1, marginHorizontal: 20}}>
                      <Text style={{color: appColors.black, fontWeight: '400'}}>
                        {item.name}
                      </Text>
                    </View>
                  )}
                />
                <View
                  style={{
                    height: 1,
                    backgroundColor: appColors.light_grey,
                    marginHorizontal: 20,
                    marginTop: 5,
                  }}
                />

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={stickerList}
                  numColumns={4}
                  style={{marginLeft: 10, height: 180}}
                  renderItem={({item, index}) => (
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'flex-start',
                          marginTop: 10,
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={item.img}
                          style={{padding: 20, height: 70, width: 70}}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
          {/* {isAdmin == 1 ? ( */}
          {/* ) : (
        <View />
      )} */}

          <RBSheetMenuOption
            isOpen={isMenuOpen}
            roomRefresh={roomRefresh}
            onSupports={onSupports}
            onFranchise={onFranchise}
            deleteChatroomApi={deleteChatroomApi}
            isAdmin={isAdmin}
            openHelp={openHelp}
            setIsMenuOpen={setIsMenuOpen}
          />

          <RBSheet
            ref={refRBSheetList}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={350}
            customStyles={{
              wrapper: {
                backgroundColor: appColors.transparent,
              },
              draggableIcon: {
                backgroundColor: '#fff',
              },
              container: {
                borderRadius: 10,
              },
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{marginLeft: 20, color: appColors.black, fontSize: 16}}>
                Add Member
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={isAdmin ? membersList : onlineMembersList}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => openProfile(item.userId)}>
                    {item.userId._id != userId ? (
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: appColors.white,
                          marginTop: 2,
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                        }}>
                        {item.userId.profileImage != '' ? (
                          <Image
                            style={styles.imageStyle}
                            source={{
                              uri: item.userId.profileImage,
                            }}
                            key={index}
                          />
                        ) : (
                          <Image
                            source={getImage('demoImage')}
                            style={styles.imageStyle}
                          />
                        )}
                        <View style={{flex: 1, marginLeft: 10}}>
                          <Text
                            style={{
                              color: appColors.black,
                              fontSize: 12,
                            }}>
                            {item.userId.userName}
                          </Text>
                        </View>
                        {isAdmin == 1 ? (
                          <View
                            style={{
                              alignItems: 'flex-end',
                              marginRight: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor:
                                item.isAudioRequestSent == 0
                                  ? appColors.primary
                                  : appColors.red,
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              borderRadius: 5,
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                item.isAudioRequestSent == 0
                                  ? sendRequest(
                                      item.userId._id,
                                      item.userId.userName,
                                    )
                                  : audioRequestAcceptReject(0, item.userId._id)
                              }>
                              {/* {indeterminate ? ( */}
                              <Text style={{color: appColors.white}}>
                                {item.isAudioRequestSent == 0
                                  ? 'Send Request'
                                  : 'Request Sent'}
                              </Text>
                              {/* ) : (
                      <Progress.Circle indeterminate={indeterminate} />
                    )} */}
                            </TouchableOpacity>
                          </View>
                        ) : (
                          ''
                        )}
                      </View>
                    ) : (
                      ''
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </RBSheet>
          <RBSheetBattle
            isOpen={isBattleOpen}
            sendWarRequestAuto={sendWarRequestAuto}
            setSelectedTime={setSelectedTime}
            handleClosePress={handleClosePress}
            timeList={timeList}
            username={username}
            selectedTime={selectedTime}
            setIsBattleOpen={setIsBattleOpen}
            chatroomData={chatroomData}
          />

          {isOpenInviteList ? (
            <RBSheetGroupList
              isOpen={isOpenInviteList}
              chatroomList={chatroomList}
              sendWarRequestApi={sendWarRequestApi}
              setIsOpenInviteList={setIsOpenInviteList}
              setMyChatData={setMyChatData}
            />
          ) : (
            ''
          )}

          {optionUserData != null ? (
            <RBSheetUserOption
              userId={userId}
              userData={userData}
              isOpen={rbUserOptionOpen}
              optionUserData={optionUserData}
              openUserProfile={openUserProfile}
              openSheetCP={openSheetCP}
              openBreakupCp={openBreakupCp}
              openGiftList={openGiftList}
              leaveUserAudio={leaveUserAudio}
              toggleSwitchMute={toggleSwitchMute}
              isEnabledMute={isEnabledMute}
              setRBUserOptionOpen={setRBUserOptionOpen}
              isAdmin={isAdmin}
              deleteUserFromChatroom={deleteUserFromChatroom}
              setMutePersonList={setMutePersonList}
              mutePersonList={mutePersonList}
              cpInUse={cpInUse}
            />
          ) : (
            ''
          )}

          <RBSheetSendCp
            isOpen={isCPOpen}
            setCPRelation={setCPRelation}
            cpRequest={cpRequest}
            cpRelation={cpRelation}
          />

          <ExitOptionModal
            modalVisible={exitModalVisible}
            setExitModalVisible={setExitModalVisible}
            navigation={navigation}
            message="Are you sure you want to exit?"
            from={from}
            socket={socket}
          />

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.pop_transparent,
              }}>
              {warRequestData != '' ? (
                <View
                  style={{
                    width: '90%',
                    height: 180,
                    backgroundColor: appColors.white,
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {warRequestData.userDetails.profileImage != '' &&
                    warRequestData.userDetails.profileImage != null ? (
                      <Image
                        source={{uri: warRequestData.userDetails.profileImage}}
                        style={{height: 50, width: 50, borderRadius: 25}}
                      />
                    ) : (
                      <DummyUserImage height={50} width={50} />
                    )}
                    <Text
                      style={{
                        color: appColors.black,
                        marginLeft: 4,
                        fontWeight: '600',
                      }}>
                      {warRequestData.userDetails.userName}
                    </Text>
                  </View>
                  <Text style={{alignSelf: 'center', margin: 10}}>
                    Sent you war request
                  </Text>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        backgroundColor: appColors.accept_green,
                        borderRadius: 10,
                        padding: 10,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => setWarRequest(1)}>
                      <AcceptButton />
                      <Text
                        style={{
                          color: appColors.white,
                          fontWeight: 'bold',
                          marginLeft: 8,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        backgroundColor: appColors.reject_red,
                        borderRadius: 10,
                        padding: 10,
                        marginLeft: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => setWarRequest(0)}>
                      <CancelButton />
                      <Text
                        style={{
                          color: appColors.white,
                          fontWeight: 'bold',
                          marginLeft: 8,
                        }}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                ''
              )}
            </View>
          </Modal>

          <Modal
            transparent={true}
            visible={cpPopUp}
            onRequestClose={this.closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.pop_transparent,
              }}>
              <View
                style={{
                  width: '90%',
                  height: 180,
                  backgroundColor: appColors.white,
                  padding: 20,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {cpId != '' && cpId.userDetails.profileImage != '' ? (
                    <Image
                      source={{uri: cpId.userDetails.profileImage}}
                      style={{height: 50, width: 50, borderRadius: 25}}
                    />
                  ) : (
                    <DummyUserImage height={50} width={50} />
                  )}
                  <Text
                    style={{
                      color: appColors.black,
                      marginLeft: 4,
                      fontWeight: '600',
                    }}>
                    {cpId != '' ? cpId.userDetails.userName : ''}
                  </Text>
                </View>
                <Text style={{alignSelf: 'center', margin: 10}}>
                  Sent you CP request
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: appColors.accept_green,
                      borderRadius: 10,
                      padding: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => cpAcceptReject(1)}>
                    <AcceptButton />
                    <Text
                      style={{
                        color: appColors.white,
                        fontWeight: 'bold',
                        marginLeft: 8,
                      }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: appColors.reject_red,
                      borderRadius: 10,
                      padding: 10,
                      marginLeft: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => cpAcceptReject(0)}>
                    <CancelButton />
                    <Text
                      style={{
                        color: appColors.white,
                        fontWeight: 'bold',
                        marginLeft: 8,
                      }}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={audioRequestPopUp}
            onRequestClose={this.closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.pop_transparent,
              }}>
              <View
                style={{
                  width: '90%',
                  height: 180,
                  backgroundColor: appColors.white,
                  padding: 20,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {audioRequestData != null &&
                  audioRequestData.user.profileImage != '' ? (
                    <Image
                      source={{uri: audioRequestData.user.profileImage}}
                      style={{height: 40, width: 40, borderRadius: 20}}
                    />
                  ) : (
                    <DummyUserImage height={50} width={50} />
                  )}
                  <Text
                    style={{
                      color: appColors.black,
                      marginLeft: 4,
                      fontWeight: '600',
                    }}>
                    {audioRequestData != null
                      ? audioRequestData.user.userName
                      : ''}
                  </Text>
                </View>
                <Text style={{alignSelf: 'center', margin: 10}}>
                  Sent request for add in audio room
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: appColors.accept_green,
                      borderRadius: 10,
                      padding: 10,
                      marginRight: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => audioRequestAcceptReject(1)}>
                    <AcceptButton />
                    <Text
                      style={{
                        color: appColors.white,
                        fontWeight: 'bold',
                        marginLeft: 8,
                      }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: appColors.reject_red,
                      borderRadius: 10,
                      padding: 10,
                      marginLeft: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => audioRequestAcceptReject(0)}>
                    <CancelButton />
                    <Text
                      style={{
                        color: appColors.white,
                        fontWeight: 'bold',
                        marginLeft: 8,
                      }}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={warModalVisible}
            onRequestClose={this.closeModal}>
            <TouchableOpacity
              onPress={() => closeWarModel()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.pop_transparent,
                paddingHorizontal: 20,
              }}>
              <TouchableWithoutFeedback onPress={() => ''}>
                <ImageBackground
                  resizeMode="stretch"
                  source={getImage('warRoomBack')}
                  style={{
                    width: '100%',
                    height: 250,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    onPress={() => ''}
                    style={{
                      color: appColors.white,
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 10,
                    }}>
                    War Room
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    {audioPersonList != null ? (
                      <View style={{alignItems: 'center'}}>
                        {warData1 != null ? (
                          <View>
                            {warData1.chatRoomOne.chatRoom.chatRoomId ==
                            room_id ? (
                              warData1.chatRoomOne.userDetails.profileImage !=
                              '' ? (
                                <Image
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                  }}
                                  source={{
                                    uri: warData1.chatRoomOne.userDetails
                                      .profileImage,
                                  }}
                                />
                              ) : (
                                <DummyUserImage height={50} width={50} />
                              )
                            ) : warData1.chatRoomTwo.userDetails.profileImage !=
                              '' ? (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                }}
                                source={{
                                  uri: warData1.chatRoomTwo.userDetails
                                    .profileImage,
                                }}
                              />
                            ) : (
                              <DummyUserImage height={50} width={50} />
                            )}
                          </View>
                        ) : (
                          <DummyUserImage height={50} width={50} />
                        )}
                        <Text
                          style={{color: appColors.white, fontWeight: '500'}}>
                          {chatroomData.chatRoomName}
                        </Text>
                      </View>
                    ) : (
                      ''
                    )}
                    <Text
                      onPress={() => ''}
                      style={{
                        color: appColors.primary,
                        alignSelf: 'center',
                        paddingHorizontal: 5,
                        flexWrap: 'wrap',
                        backgroundColor: appColors.white,
                        borderRadius: 5,
                        fontWeight: '500',
                        fontSize: 12,
                        marginHorizontal: 40,
                      }}>
                      LV{' '}
                      {audioPersonList != null && audioPersonList.length > 0
                        ? audioPersonList[0].userId.level
                        : 0}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}></View>
                    {warData != null ? (
                      <View style={{alignItems: 'center'}}>
                        {warData1 != null ? (
                          <TouchableOpacity
                            onPress={() => goToAnotherChatroom()}>
                            {warData1.chatRoomOne.chatRoom.chatRoomId !=
                            room_id ? (
                              warData1.chatRoomOne.userDetails.profileImage !=
                              '' ? (
                                <Image
                                  style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                  }}
                                  source={{
                                    uri: warData1.chatRoomOne.userDetails
                                      .profileImage,
                                  }}
                                />
                              ) : (
                                <DummyUserImage height={50} width={50} />
                              )
                            ) : warData1.chatRoomTwo.userDetails.profileImage !=
                              '' ? (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 25,
                                }}
                                source={{
                                  uri: warData1.chatRoomTwo.userDetails
                                    .profileImage,
                                }}
                              />
                            ) : (
                              <DummyUserImage height={50} width={50} />
                            )}
                          </TouchableOpacity>
                        ) : (
                          <DummyUserImage height={50} width={50} />
                        )}
                        <Text
                          style={{color: appColors.white, fontWeight: '500'}}>
                          {warData.warRoomChatId.chatRoomName ==
                          chatroomData.chatRoomName
                            ? warData.warOtherRoomChatId.chatRoomName
                            : warData.warRoomChatId.chatRoomName}
                        </Text>
                      </View>
                    ) : (
                      ''
                    )}
                  </View>
                  <Progress.Bar
                    progress={progressVal}
                    width={300}
                    style={{marginTop: 20}}
                    unfilledColor={appColors.yellow}
                    borderWidth={0}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                      marginLeft: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        flex: 1,
                      }}>
                      <Image source={getImage('coin')} />
                      <Text style={{color: appColors.white}}>{myGiftCoin}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        marginEnd: 20,
                      }}>
                      <Text
                        style={{color: appColors.white, alignSelf: 'flex-end'}}>
                        {otherGiftCoin}
                      </Text>
                      <Image source={getImage('coin')} />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 40,
                      alignItems: 'center',
                    }}>
                    <Text
                      onPress={() => ''}
                      style={{
                        color: appColors.white,
                        fontSize: 10,
                        flex: 1,
                        marginLeft: 20,
                      }}>
                      Support your chatroom by sending gift
                    </Text>
                    <Text
                      style={{
                        backgroundColor: appColors.white,
                        color: appColors.primary,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        marginRight: 20,
                        fontSize: 12,
                        fontWeight: '500',
                      }}
                      onPress={() => openGiftList(true)}>
                      Send Gifts
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
          <Modal
            transparent={true}
            visible={winnerModalVisible}
            onRequestClose={this.closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: appColors.pop_transparent,
                paddingHorizontal: 20,
              }}>
              {winnerData != null ? (
                <ImageBackground
                  resizeMode="stretch"
                  source={getImage('winnerBack')}
                  style={{
                    width: '100%',
                    height: 420,
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: appColors.red,
                      fontSize: 20,
                      fontWeight: '600',
                      marginTop: 10,
                    }}>
                    {winnerData.warDetails.winnerChatRoomId.chatRoomId ==
                    room_id
                      ? 'Winner'
                      : 'Loser'}
                  </Text>
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={getImage('winnerIcon')}
                      style={{
                        height: 110,
                        width: 110,
                        alignItems: 'center',
                      }}>
                      <View style={{marginTop: 10}}>
                        {winnerData.warDetails.warRoomChatId.chatRoomId ==
                        room_id ? (
                          winnerData.warDetails.warRoomChatId.image != '' ? (
                            <Image
                              source={{
                                uri: winnerData.warDetails.warRoomChatId.image,
                              }}
                              style={styles.imageStyle}
                            />
                          ) : (
                            <View style={{marginTop: 10}}>
                              <DummyUserImage height={50} width={50} />
                            </View>
                          )
                        ) : winnerData.warDetails.warOtherRoomChatId.image !=
                          '' ? (
                          <Image
                            source={{
                              uri: winnerData.warDetails.warOtherRoomChatId
                                .image,
                            }}
                            style={styles.imageStyle}
                          />
                        ) : (
                          <DummyUserImage height={50} width={50} />
                        )}
                      </View>
                    </ImageBackground>
                    <Text style={{color: appColors.white, fontSize: 16}}>
                      {winnerData.warDetails.warRoomChatId.chatRoomId == room_id
                        ? winnerData.warDetails.warRoomChatId.chatRoomName
                        : winnerData.warDetails.warOtherRoomChatId.chatRoomName}
                    </Text>
                    <Progress.Bar
                      progress={progressVal}
                      width={300}
                      style={{marginTop: 10}}
                      unfilledColor={appColors.yellow}
                      borderWidth={0}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 4,
                        marginLeft: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                          flex: 1,
                        }}>
                        <Image source={getImage('coin')} />
                        <Text style={{color: appColors.white}}>
                          {winnerData.warDetails.winnerChatRoomId.chatRoomId ==
                          room_id
                            ? winnerData.warDetails.winnerChatRoomId
                                .chatRoomId ==
                              winnerData.warDetails.warRoomChatId.chatRoomId
                              ? winnerData.warDetails.warRoomChatIdGiftCount
                              : winnerData.warDetails
                                  .warOtherRoomChatIdGiftCount
                            : winnerData.warDetails.winnerChatRoomId
                                .chatRoomId !=
                              winnerData.warDetails.warRoomChatId.chatRoomId
                            ? winnerData.warDetails.warRoomChatIdGiftCount
                            : winnerData.warDetails.warOtherRoomChatIdGiftCount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                          marginEnd: 20,
                        }}>
                        <Text
                          style={{
                            color: appColors.white,
                            alignSelf: 'flex-end',
                          }}>
                          {winnerData.warDetails.winnerChatRoomId.chatRoomId ==
                          room_id
                            ? winnerData.warDetails.winnerChatRoomId
                                .chatRoomId ==
                              winnerData.warDetails.warRoomChatId.chatRoomId
                              ? winnerData.warDetails
                                  .warOtherRoomChatIdGiftCount
                              : winnerData.warDetails.warRoomChatIdGiftCount
                            : winnerData.warDetails.winnerChatRoomId
                                .chatRoomId !=
                              winnerData.warDetails.warRoomChatId.chatRoomId
                            ? winnerData.warDetails.warOtherRoomChatIdGiftCount
                            : winnerData.warDetails.warRoomChatIdGiftCount}
                        </Text>
                        <Image source={getImage('coin')} />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <ImageBackground
                        resizeMode="contain"
                        source={getImage('winnerUser')}
                        style={{
                          height: 125,
                          width: 100,
                          alignItems: 'center',
                        }}>
                        <Text style={{color: appColors.black, marginTop: 16}}>
                          1st
                        </Text>
                        {winnerData.chatRoomOneAdmin._id == userId &&
                        winnerData.chatRoomOne.length > 0 ? (
                          <View>
                            {winnerData.chatRoomOne[0].key.profileImage != '' &&
                            winnerData.chatRoomOne[0].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomOne[0].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        ) : (
                          <View>
                            {winnerData.chatRoomTwo.length > 0 &&
                            winnerData.chatRoomTwo[0].key.profileImage != '' &&
                            winnerData.chatRoomTwo[0].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomTwo[0].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        )}
                        <Text
                          style={{
                            color: appColors.black,
                            fontSize: 10,
                            marginLeft: -5,
                          }}>
                          {winnerData.chatRoomOneAdmin._id == userId
                            ? winnerData.chatRoomOne.length > 0
                              ? winnerData.chatRoomOne[0].key.userName
                              : 'username'
                            : winnerData.chatRoomTwo.length > 0
                            ? winnerData.chatRoomTwo[0].key.userName
                            : 'username'}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 8,
                            marginLeft: -5,
                          }}>
                          <Image
                            source={getImage('coin')}
                            style={{height: 16, width: 16}}
                          />
                          <Text
                            style={{
                              color: appColors.black,
                              marginLeft: 2,
                              fontSize: 10,
                              alignItems: 'center',
                            }}>
                            {winnerData.chatRoomOneAdmin._id == userId
                              ? winnerData.chatRoomOne.length > 0
                                ? winnerData.chatRoomOne[0].value
                                : 0
                              : winnerData.chatRoomTwo.length > 0
                              ? winnerData.chatRoomTwo[0].value
                              : 0}
                          </Text>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        resizeMode="contain"
                        source={getImage('winnerUser')}
                        style={{
                          height: 125,
                          width: 110,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: appColors.black,
                            marginTop: 16,
                            fontWeight: '500',
                          }}>
                          2nd
                        </Text>
                        {winnerData.chatRoomOneAdmin._id == userId &&
                        winnerData.chatRoomOne.length > 2 ? (
                          <View>
                            {winnerData.chatRoomOne[1].key.profileImage != '' &&
                            winnerData.chatRoomOne[1].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomOne[1].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        ) : (
                          <View>
                            {winnerData.chatRoomTwo.length > 1 &&
                            winnerData.chatRoomTwo[1].key.profileImage != '' &&
                            winnerData.chatRoomTwo[1].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomTwo[1].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        )}
                        <Text
                          style={{
                            color: appColors.black,
                            fontSize: 10,
                            marginLeft: -5,
                          }}>
                          {winnerData.chatRoomOneAdmin._id == userId
                            ? winnerData.chatRoomOne.length > 1
                              ? winnerData.chatRoomOne[1].key.userName
                              : 'username'
                            : winnerData.chatRoomTwo.length > 1
                            ? winnerData.chatRoomTwo[1].key.userName
                            : 'username'}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 8,
                            marginLeft: -5,
                          }}>
                          <Image
                            source={getImage('coin')}
                            style={{height: 16, width: 16}}
                          />
                          <Text
                            style={{
                              color: appColors.black,
                              marginLeft: 2,
                              fontSize: 10,
                              alignItems: 'center',
                            }}>
                            {winnerData.chatRoomOneAdmin._id == userId
                              ? winnerData.chatRoomOne.length > 1
                                ? winnerData.chatRoomOne[1].value
                                : 0
                              : winnerData.chatRoomTwo.length > 1
                              ? winnerData.chatRoomTwo[1].value
                              : 0}
                          </Text>
                        </View>
                      </ImageBackground>
                      <ImageBackground
                        resizeMode="contain"
                        source={getImage('winnerUser')}
                        style={{
                          height: 125,
                          width: 100,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: appColors.black,
                            marginTop: 16,
                            fontWeight: '500',
                          }}>
                          3rd
                        </Text>
                        {winnerData.chatRoomOneAdmin._id == userId &&
                        winnerData.chatRoomOne.length > 2 ? (
                          <View>
                            {winnerData.chatRoomOne[2].key.profileImage != '' &&
                            winnerData.chatRoomOne[2].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomOne[2].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        ) : (
                          <View>
                            {winnerData.chatRoomTwo.length > 2 &&
                            winnerData.chatRoomTwo[2].key.profileImage != '' &&
                            winnerData.chatRoomTwo[2].key.profileImage !=
                              null ? (
                              <Image
                                source={{
                                  uri: winnerData.chatRoomTwo[2].key
                                    .profileImage,
                                }}
                                style={{
                                  height: 30,
                                  width: 30,
                                  borderRadius: 15,
                                  marginTop: 10,
                                  marginLeft: -5,
                                }}
                              />
                            ) : (
                              <View style={{marginTop: 10}}>
                                <DummyUserImage height={30} width={30} />
                              </View>
                            )}
                          </View>
                        )}
                        <Text
                          style={{
                            color: appColors.black,
                            fontSize: 10,
                            marginLeft: -5,
                          }}>
                          {winnerData.chatRoomOneAdmin._id == userId
                            ? winnerData.chatRoomOne.length > 2
                              ? winnerData.chatRoomOne[2].key.userName
                              : 'username'
                            : winnerData.chatRoomTwo.length > 2
                            ? winnerData.chatRoomTwo[2].key.userName
                            : 'username'}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 8,
                            marginLeft: -5,
                          }}>
                          <Image
                            source={getImage('coin')}
                            style={{height: 16, width: 16}}
                          />
                          <Text
                            style={{
                              color: appColors.black,
                              marginLeft: 2,
                              fontSize: 10,
                              alignItems: 'center',
                            }}>
                            {winnerData.chatRoomOneAdmin._id == userId
                              ? winnerData.chatRoomOne.length > 2
                                ? winnerData.chatRoomOne[2].value
                                : 0
                              : winnerData.chatRoomTwo.length > 2
                              ? winnerData.chatRoomTwo[2].value
                              : 0}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                    <Text
                      style={{
                        // backgroundColor: appColors.yellow,
                        color: appColors.yellow,
                        paddingHorizontal: 10,
                        paddingVertical: 16,
                        borderRadius: 5,
                        fontSize: 12,
                        fontWeight: '500',
                      }}
                      onPress={() => {
                        setWinnerData(null);
                        setWinnerModalVisible(false);
                      }}>
                      Close
                    </Text>
                  </View>
                </ImageBackground>
              ) : (
                ''
              )}
            </View>
          </Modal>

          {giftList != null && giftVisible ? (
            <RBSheetGift
              isOpen={giftVisible}
              setGiftPersonListData={setGiftPersonListData}
              sendGift={sendGift}
              giftList={giftList}
              categoriesList={categoriesList}
              giftTo={giftTo}
              audioPersonList={audioPersonList}
              setGiftVisible={setGiftVisible}
            />
          ) : (
            ''
          )}

          {stickerList != null ? (
            <RBSheetSticker
              isOpen={stickerVisible}
              categoriesListSticker={categoriesListSticker}
              stickerList={stickerList}
              sendPing={sendPing}
              setStickerVisible={setStickerVisible}
            />
          ) : (
            ''
          )}

          <RBSheetPesonList
            isOpen={isGiftListOpen}
            audioPersonList={audioPersonList}
            setGiftTo={setGiftTo}
            setGiftPersonListData={setGiftPersonListData}
          />
          {optionUserData != null ? (
            <RBSheet
              ref={refRBSheetBreakup}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={230}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                  marginHorizontal: 10,
                },
                draggableIcon: {
                  backgroundColor: appColors.white,
                },
                container: {
                  borderRadius: 10,
                },
              }}>
              <ImageBackground
                source={getImage('breakupBack')}
                style={{flex: 1}}>
                {optionUserData != null &&
                Object.keys(optionUserData.cpDetails).length != 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 20,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20,
                      }}>
                      {optionUserData.cpDetails.createdBy._id == userId ? (
                        optionUserData.cpDetails.createdBy.profileImage !=
                        '' ? (
                          <Image
                            source={{
                              uri: optionUserData.cpDetails.createdBy
                                .profileImage,
                            }}
                            style={{height: 50, width: 50, borderRadius: 25}}
                          />
                        ) : (
                          <DummyUserImage height={50} width={50} />
                        )
                      ) : Object.keys(optionUserData.cpDetails).length != 0 &&
                        optionUserData.cpDetails.otherUserId.profileImage !=
                          '' ? (
                        <Image
                          source={{
                            uri: optionUserData.cpDetails.otherUserId
                              .profileImage,
                          }}
                          style={{height: 50, width: 50, borderRadius: 25}}
                        />
                      ) : (
                        <DummyUserImage height={50} width={50} />
                      )}
                      <Text style={{color: appColors.black}}>
                        {optionUserData.cpDetails.createdBy._id == userId
                          ? optionUserData.cpDetails.createdBy.userName
                          : optionUserData.cpDetails.otherUserId.userName}
                      </Text>
                    </View>

                    <Image
                      source={
                        optionUserData.cpDetails.cpType == 'Family'
                          ? getImage('homeRel')
                          : getImage('loveRel')
                      }
                      style={{width: 225, height: 60, marginLeft: -20}}
                    />
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 20,
                      }}>
                      {Object.keys(optionUserData.cpDetails).length != 0 &&
                      optionUserData.cpDetails.createdBy._id != userId ? (
                        optionUserData.cpDetails.createdBy.profileImage !=
                        '' ? (
                          <Image
                            source={{
                              uri: optionUserData.cpDetails.createdBy
                                .profileImage,
                            }}
                            style={{height: 50, width: 50, borderRadius: 25}}
                          />
                        ) : (
                          <DummyUserImage height={50} width={50} />
                        )
                      ) : Object.keys(optionUserData.cpDetails).length != 0 &&
                        optionUserData.cpDetails.otherUserId.profileImage !=
                          '' ? (
                        <Image
                          source={{
                            uri: optionUserData.cpDetails.otherUserId
                              .profileImage,
                          }}
                          style={{height: 50, width: 50, borderRadius: 25}}
                        />
                      ) : (
                        <DummyUserImage height={50} width={50} />
                      )}
                      <Text
                        style={{color: appColors.black, textAlign: 'center'}}>
                        {optionUserData.cpDetails.createdBy._id != userId
                          ? optionUserData.cpDetails.createdBy.userName
                          : optionUserData.cpDetails.otherUserId.userName}
                      </Text>
                    </View>
                  </View>
                ) : (
                  ''
                )}
                <TouchableOpacity
                  style={{justifyContent: 'center', marginTop: 10}}
                  onPress={() => cpTerminated()}>
                  <Text
                    style={{
                      paddingVertical: 10,
                      backgroundColor: appColors.red,
                      textAlign: 'center',
                      color: appColors.white,
                      marginHorizontal: 50,
                      borderRadius: 10,
                    }}>
                    Breakup
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </RBSheet>
          ) : (
            ''
          )}
          {isOpenVideo.isOpen ? (
            <VideoModal
              open={isOpenVideo}
              setOpenVideo={() => {
                setOpenVideo({isOpen: false});
              }}
              video={isOpenVideo.url}
              type={isOpenVideo.type}
              isPlaying={isPlayingVideo}
            />
          ) : (
            ''
          )}
        </ImageBackground>
      ) : (
        ''
      )}
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.back_color,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextStyle: {
    fontSize: 16,
    color: appColors.white,
    marginLeft: 16,
    fontFamily: getFont.Rochester,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    height: 300,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  bottomInnerStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    borderColor: appColors.light_grey,
    borderRadius: 5,
    borderWidth: 1,
  },
  tagStyle: {
    borderWidth: 1,
    color: appColors.grey,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
    textAlign: 'center',
    width: 80,
  },
  imageStyle: {height: 50, width: 50, borderRadius: 25},
  fameStyle: {
    height: 55,
    width: 55,
    position: 'absolute',
    top: 0,
  },
  frameView: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  userText: {
    fontSize: 11,
    color: appColors.white,
    textAlign: 'center',
    height: 14,
    marginTop: 5,
    fontFamily: getFont.Rochester,
    alignSelf: 'center',
  },
});
