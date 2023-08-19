import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import CrossIcon from '../../../assets/svg/CrossIcon';
import BackArrow from '../../../assets/svg/BackArrow';
import {
  getAllChatroom,
  joinChatroom,
  joinRoom,
} from '../../../redux/actions/action';
import {useDispatch} from 'react-redux';
import * as Progress from 'react-native-progress';
import {join} from 'redux-saga/effects';
import {getId} from '../../../utils/localStorage';
import {encrypted} from '../../../utils/encDecData';
import {SkypeIndicator} from 'react-native-indicators';
import DummyUserImage from '../../../assets/svg/DummyUserImage';

const AllChatrooms = ({navigation}) => {
  const [allChatData, setAllChatData] = useState(null);
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();
  const callBack = val => {
    console.log('ValMyChatroom==>', val);

    if (val.length > 0) {
      setAllChatData(val);
    } else {
      setAllChatData(null);
    }
  };

  const getOnlineCount = members => {
    const count = members.filter(obj => obj.socketId !== '').length;
    return count;
  };

  const joinCallback = val => {
    console.log('Join Callback==>', val);

    // setIndeterminate(true);
    // setJoinData(val);
    // dispatch(getAllChatroom({callBack}));
    if (val.status == 1) {
      if (val.message != 'You are blocked for this chat room') {
        if (val.message != 'Request to join room has been sent.') {
          console.log('val IsAdded===>', val);

          navigation.pop();
          navigation.navigate('Chatroom', {
            room_id: val.data.chatRoomId,
            roomName: val.data.chatRoomName,
            userId: userId,
          });
        } else {
          alert('Requsest sent to admin for join please wait...');
        }
      } else {
        showToast('You are blocked for this chat room');
      }
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

  useEffect(() => {
    if (userId == '') {
      getId(setUserId);
      // setUserId(id);
    } else {
      console.log('UserId', userId);
    }
  }, [userId]);

  useEffect(() => {
    console.log('Call', 'Call');
    dispatch(getAllChatroom({callBack}));
    // getToken();
  }, []);

  const joinRoom1 = roomId => {
    const payload = {
      chatRoomId: roomId,
    };
    console.log('Room Id==>', payload);
    // const payload = encrypted(data);
    dispatch(joinRoom({payload, joinCallback}));
  };

  return (
    <View style={{flex: 1}}>
      {/* <Progress.Circle indeterminate={indeterminate} /> */}
      {allChatData != null && allChatData != [] ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: appColors.white,
              padding: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <Text
              style={{
                color: appColors.primary,
                fontSize: 18,
                alignSelf: 'center',
              }}>
              All<Text style={{color: appColors.grey}}> Chatrooms</Text>
            </Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={allChatData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: appColors.white,
                  marginTop: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                {item.image == '' || item.image == 'abc' ? (
                  <DummyUserImage height={50} width={50} />
                ) : (
                  <Image
                    style={styles.imageStyle}
                    source={{uri: item.image}}
                    key={index}
                  />
                )}
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text
                    style={{
                      color: appColors.black,
                      fontSize: 12,
                    }}>
                    {item.chatRoomName}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={getImage('activechat')}
                      style={{marginTop: 5}}
                    />
                    <Text style={{color: appColors.grey, marginLeft: 5}}>
                      {getOnlineCount(item.members)} online
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: appColors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 5,
                  }}>
                  <TouchableOpacity onPress={() => joinRoom1(item.chatRoomId)}>
                    {/* {indeterminate ? ( */}
                    <Text style={{color: appColors.white}}>Join</Text>
                    {/* ) : (
                      <Progress.Circle indeterminate={indeterminate} />
                    )} */}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <SkypeIndicator color={appColors.dark_primary} size={50} />
          </View>
        </View>
      )}
    </View>
  );
};

export default AllChatrooms;

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
