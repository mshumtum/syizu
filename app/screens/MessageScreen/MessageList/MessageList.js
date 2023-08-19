import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getOneToOneChatList} from '../../../redux/actions/action';
import {useIsFocused} from '@react-navigation/native';
import {getId} from '../../../utils/localStorage';
import AddButtonAll from '../../../assets/svg/AddButtonAll';
import DummyUserImage from '../../../assets/svg/DummyUserImage';

const MessageList = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const chatListCallback = val => {
    console.log('ChatList Data ==> ', val.data[0].messages);
    setChatList(val.data);
  };

  useEffect(() => {
    getId(setUserId);
    dispatch(getOneToOneChatList({chatListCallback}));
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    // getId(setUserId);
    if (isFocused) {
      console.log('Refresh===>', isFocused);
      dispatch(getOneToOneChatList({chatListCallback}));
    }
    // getToken();
  }, [isFocused]);

  return (
    <View style={styles.containerStyle}>
      {chatList.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={chatList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  userData: item.otherUserId,
                  chatId: item._id,
                  userId: userId,
                })
              }
              style={{
                flex: 1,
                backgroundColor: appColors.white,
                marginTop: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {item.createdBy._id != userId ? (
                item.createdBy.profileImage != '' ? (
                  <Image
                    style={{
                      justifyContent: 'center',
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      marginLeft: 16,
                    }}
                    source={{
                      uri: item.createdBy.profileImage,
                    }}
                    key={index}
                  />
                ) : (
                  <View style={{marginLeft: 16}}>
                    <DummyUserImage height={40} width={40} />
                  </View>
                )
              ) : item.otherUserId.profileImage != '' ? (
                <Image
                  style={{
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    marginLeft: 16,
                  }}
                  source={{
                    uri: item.otherUserId.profileImage,
                  }}
                  key={index}
                />
              ) : (
                <View style={{marginLeft: 16}}>
                  <DummyUserImage height={40} width={40} />
                </View>
              )}
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {item.createdBy._id != userId
                    ? item.createdBy.userName
                    : item.otherUserId.userName}
                </Text>
                {item.messages.length > 0 ? (
                  <Text style={{color: appColors.grey, marginLeft: 10}}>
                    {item.messages[item.messages.length - 1].message}
                  </Text>
                ) : (
                  ''
                )}
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginRight: 20,
                  marginTop: 20,
                }}>
                {/* <Text
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: appColors.primary,
                    color: appColors.white,
                    borderRadius: 15,
                    padding: 5,
                    textAlign: 'center',
                  }}>
                  20
                
                </Text> */}
                <Text style={{color: appColors.black}}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: appColors.back_color,
              height: 200,
              width: 320,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <AddButtonAll />
            <Text style={{fontSize: 18}}>Send Request for start chat</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: appColors.white},
});
