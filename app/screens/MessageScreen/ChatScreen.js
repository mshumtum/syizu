import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {getImage} from '../../utils/getImage';
import EmojiIcon from '../../assets/svg/EmojiIcon';
import SendIcon from '../../assets/svg/SendIcon';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  acceptRejectChatRequest,
  getOneToOneChatDetail,
  sendChatRequest,
} from '../../redux/actions/action';
import {io} from 'socket.io-client';
import {useEffect} from 'react';
import {getId} from '../../utils/localStorage';
import {All_EMOJIS} from '../../utils/Emojis';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import {socket} from '../../../App';

// const socket = io('https://chat.virtualittechnology.com/');

const ChatScreen = ({navigation, route}) => {
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessageList, setChatMessageList] = useState([]);
  const [flag, setFlag] = useState(true);

  const {userData, chatId, userId} = route.params;

  const [chatId2, setChatId] = useState('');
  const dispatch = useDispatch();
  const [myUserId, setMyUserId] = useState('');

  const [isRequestSend, setRequestSend] = useState(false);
  const [isAccepted, setIsAccepted] = useState(2);

  useEffect(() => {
    getId(setMyUserId);

    console.log('USerData ==>', userData);

    socket.on('connect', () => {
      console.log('Connect=====>');
    });
    // // setIsConnected(true);

    socket.on('receive_one_to_one_message', data => {
      console.log('receive_one_to_one_message', data);
      setFlag(false);
      setMessageUser(data);
    });
  }, [socket]);

  useEffect(() => {
    console.log(isAccepted);

    setTimeout(async () => {
      var data = {
        userId: myUserId,
      };
      // setFlag(true);
      console.log('touch_server', data);
      socket.emit('touch_server', data);
      console.log('Hit socket');
    }, 1000);
  }, [myUserId]);

  const getChatroom = () => {
    if (chatId != 0) {
      var payload = {roomID: chatId};

      console.log('RoomID ===>', payload);

      dispatch(getOneToOneChatDetail({payload, messageCallback}));
    }
  };

  useEffect(() => {
    getChatroom();
  }, []);

  const messageCallback = val => {
    console.log('Messages Accepted ===> ', val.data.isAccepted);
    setIsAccepted(val.data.isAccepted);
    for (let i = 0; i < val.data.messages.length; i++) {
      console.log(val.data.messages[i]);
      chatMessageList.push(val.data.messages[i]);
      if (i == val.data.messages.length - 1) {
        setChatMessageList(chatMessageList.reverse());
        setFlag(!flag);
      }
    }
  };

  const setMessageUser = msgData => {
    // console.log('MsgData==>', msgData);
    chatMessageList.reverse().push(msgData);
    // console.log('MsgData==>', chatMessageList);
    setChatMessageList(chatMessageList.reverse());
    setFlag(true);
  };

  const sendPing = (message1, type) => {
    if (message1 != '') {
      var data = {
        userId: myUserId,
        message: message1.toString().trim(),
        _id: chatId2 != '' ? chatId2 : chatId,
        type: 1,
      };

      // setFlag(true);
      console.log('Button', data);
      socket.emit('send_message_one_to_one', data);
      // setChatMessageList(chatMessageList);
      setMessage('');
    }
  };

  const chatRequestCallback = val => {
    console.log('ChatRequestRespose', val);
    // {"data": {"_id": "641c86385391f85f51009a76"}, "message": "Success", "status": 1}
    if (val.status == 1) {
      showToast('Chat Request Sent');

      setChatId(val.data._id);
      // alert('Chat Request Sent');
      setRequestSend(true);
      getChatroom();
    }
  };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const chatRequest = () => {
    const payload = {
      otherUserId: userData._id,
    };

    dispatch(sendChatRequest({payload, chatRequestCallback}));
  };

  const callbackRequest = () => {
    // if (val.status == 1) {
    showToast('Chat Request Cancel');
    // alert('Chat Request Sent');
    setRequestSend(false);
    setIsAccepted(2);
    // }
  };

  const acceptRejectRequest = (id, status) => {
    setRequestSend(false);
    const payload = {
      status: 0,
      _id: chatId2 != '' ? chatId2 : chatId,
    };
    console.log(payload);
    dispatch(acceptRejectChatRequest({payload, callbackRequest}));
  };

  function convertUTCToLocalTime(dateString) {
    var theDate = new Date(Date.parse(dateString));
    theDate.toLocaleString();
    var date = `${theDate.getDate()}-${
      theDate.getMonth() + 1
    }-${theDate.getFullYear()}`;
    // console.log(date);
    return date;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        {userData.profileImage != '' ? (
          <Image
            source={{uri: userData.profileImage}}
            style={styles.imageStyle}
          />
        ) : (
          <DummyUserImage height={40} width={40} />
        )}
        <Text style={styles.textHeaderStyle}>{userData.userName}</Text>
      </View>
      <View style={{height: 1, backgroundColor: appColors.light_grey}} />
      <View style={{flex: 1}}>
        <FlatList
          inverted
          data={chatMessageList}
          style={{margin: 16}}
          scrollToItem={chatMessageList.length - 1}
          // initialScrollIndex={0}
          renderItem={({item, index}) => (
            <View style={{flexDirection: 'row', marginTop: 16, width: '90%'}}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                // onPress={() => openUserOption(item)}
              >
                {item.senderId.profileImage != '' ? (
                  <Image
                    source={{uri: item.senderId.profileImage}}
                    style={{height: 50, width: 50, borderRadius: 25}}
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
                <Text style={{color: appColors.black, fontWeight: 'bold'}}>
                  {item.senderId.userName}
                </Text>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: appColors.light_grey,
                    borderRadius: 8,
                    marginRight: 8,
                  }}>
                  <Text
                    style={{
                      color: appColors.text_grey,
                    }}>
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: appColors.grey,
                      alignSelf: 'flex-end',
                      fontSize: 12,
                      marginTop: 4,
                    }}>
                    {convertUTCToLocalTime(item.createdAt)}
                    {/* {console.log(convertUTCToLocalTime(item.createdAt))} */}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      {emojiVisible ? (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={All_EMOJIS}
            style={{marginLeft: 10, height: 40, marginBottom: 20}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setMessage(message.toString() + item.toString())}
                style={{
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
        </View>
      ) : (
        <View />
      )}
      {isAccepted == 1 || chatMessageList.length > 0 ? (
        <View
          style={{
            borderColor: appColors.grey,
            borderRadius: 30,
            paddingLeft: 10,
            bottom: 10,
            alignSelf: 'flex-end',
            borderWidth: 1,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Type Here..."
            placeholderTextColor={appColors.black}
            style={{flex: 1, color: appColors.black}}
            value={message}
            onFocus={() => setEmojiVisible(false)}
            onChangeText={val => setMessage(val)}
          />
          {/* onPress={() => showEmoji()} */}
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => setEmojiVisible(!emojiVisible)}>
            <EmojiIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sendPing(message, 1)}
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
        </View>
      ) : (
        <View
          style={{
            borderColor: appColors.grey,
            borderRadius: 30,
            paddingHorizontal: 10,
            bottom: 10,
            alignSelf: 'center',
            borderWidth: 1,
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:
              isRequestSend || isAccepted === 0
                ? appColors.red
                : appColors.primary,
          }}>
          <TouchableOpacity
            onPress={() =>
              !isRequestSend && isAccepted == 2
                ? chatRequest()
                : acceptRejectRequest()
            }
            style={{flex: 1}}>
            <Text
              style={{
                padding: 10,
                color: appColors.white,
                textAlign: 'center',
              }}>
              {isRequestSend || isAccepted == 0
                ? 'Cancel Request'
                : 'Send Request'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  textHeaderStyle: {
    color: appColors.black,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageStyle: {
    height: 40,
    width: 40,
    marginLeft: 10,
    borderRadius: 20,
  },
});
