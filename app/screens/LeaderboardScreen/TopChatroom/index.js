import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImage} from '../../../utils/getImage';
import LeaderboardIcon from '../../../assets/svg/LeaderboardIcon';

import {appColors} from '../../../utils/appColors';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import {useDispatch} from 'react-redux';
import {leaderBoardGifter} from '../../../redux/actions/action';
import {set} from 'react-native-reanimated';
import DummyUserImage from '../../../assets/svg/DummyUserImage';
import {useIsFocused} from '@react-navigation/native';

import ProgressModal from '../../../components/ProgressModal';
import {getId} from '../../../utils/localStorage';
import {hideTextDots} from '../../../utils/utils';

const TopChatroom = ({navigation}) => {
  const [topChatroom, setTopChatroom] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [chatroomType, setChatroomType] = useState(1);
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState('');

  const [progressVisible, setProgressVisible] = useState(false);

  const showAllRanks = () => {
    navigation.navigate('TopCpAllRank');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      getId(setUserId);
      setProgressVisible(true);
      setChatroomType(1);
      const payload = {
        module: 'ChatRoom',
        type: 1,
      };

      dispatch(leaderBoardGifter({payload, callbackGifter}));
    }
  }, [isFocused]);

  const callbackGifter = response => {
    console.log('Chatroom === >', response);
    setProgressVisible(false);
    setTopChatroom(response.data);
    setLastData(response.lastData);
  };

  const getChatroom = type => {
    setChatroomType(type);
    const payload = {
      module: 'ChatRoom',
      type: type,
    };
    dispatch(leaderBoardGifter({payload, callbackGifter}));
  };

  return (
    <View style={styles.containerStyle}>
      {lastData != null && lastData.length > 0 ? (
        <ImageBackground
          source={getImage('top_chatroom')}
          style={{height: 220, flexDirection: 'row', justifyContent: 'center'}}>
          {lastData.length > 1 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chatroom', {
                  room_id: lastData[1].chatRoomId,
                  roomName: lastData[1].chatRoomName,
                  userId: userId,
                });
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 45,
              }}>
              {lastData[1].image != '' ? (
                // <Image
                //   style={{
                //     height: 30,
                //     width: 30,
                //     marginTop: 8,
                //     borderRadius: 15,
                //   }}
                //   source={{uri: lastData[1].image}}
                // />

                <View
                  style={{
                    height: 50,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginBottom: 8,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[1].image}}
                  />

                  <Image
                    style={{
                      height: 67,
                      width: 67,
                      position: 'absolute',
                    }}
                    source={getImage('top_two_chat')}
                  />
                </View>
              ) : (
                <DummyUserImage height={40} width={40} />
                // <Image
                //   style={{
                //     height: 30,
                //     width: 30,
                //     marginTop: 8,
                //     borderRadius: 15,
                //   }}
                //   source={getImage('demoImage')}
                // />
              )}
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {/* <Image
                  style={{width: 25, height: 25, marginRight: 5}}
                  source={getImage('badge_3')}
                /> */}
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {hideTextDots(lastData[1].chatRoomName)}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 16, width: 16}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[1].coins}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}
          {lastData.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chatroom', {
                  room_id: lastData[0].chatRoomId,
                  roomName: lastData[0].chatRoomName,
                  userId: userId,
                });
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 8,
              }}>
              {lastData[0].image != '' ? (
                // <Image
                //   style={{
                //     height: 30,
                //     width: 30,
                //     marginTop: 8,
                //     borderRadius: 15,
                //   }}
                //   source={{uri: lastData[0].image}}
                // />

                <View
                  style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 32,
                      width: 32,
                      marginBottom: 8,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[0].image}}
                  />

                  <Image
                    style={{
                      height: 68,
                      width: 68,
                      position: 'absolute',
                      // top: 0.1,
                    }}
                    source={getImage('top_one_chat')}
                  />
                </View>
              ) : (
                <DummyUserImage height={40} width={40} />
              )}
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {/* <Image
                  style={{width: 25, height: 25, marginRight: 5}}
                  source={getImage('badge_6')}
                /> */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: appColors.text_grey,
                    marginTop: 10,
                  }}>
                  {hideTextDots(lastData[0].chatRoomName)}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[0].coins}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}

          {lastData.length > 2 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chatroom', {
                  room_id: lastData[2].chatRoomId,
                  roomName: lastData[2].chatRoomName,
                  userId: userId,
                });
              }}
              style={{flex: 1, alignItems: 'center', marginTop: 60}}>
              {/* <Text
                style={{
                  color: appColors.primary,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: appColors.white,
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 30,
                  justifyContent: 'flex-end',
                }}
                onPress={showAllRanks}>
                All Rank
              </Text> */}

              {lastData[2].image != '' ? (
                <View
                  style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
                      marginBottom: 10,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[2].image}}
                  />

                  <Image
                    style={{
                      height: 68,
                      width: 68,
                      position: 'absolute',
                      // top: 0.1,
                    }}
                    source={getImage('top_three_chat')}
                  />
                </View>
              ) : (
                <DummyUserImage height={40} width={40} />
              )}

              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  marginTop: 10,
                }}>
                {/* <Image
                  style={{width: 20, height: 20}}
                  source={getImage('badge_1')}
                /> */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: appColors.text_grey,

                    marginLeft: 5,
                  }}>
                  {hideTextDots(lastData[2].chatRoomName)}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[2].coins}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}
        </ImageBackground>
      ) : (
        <ImageBackground
          source={getImage('top_chatroom')}
          style={{height: 220, flexDirection: 'row', justifyContent: 'center'}}
        />
      )}
      <View style={styles.tabBarStyle}>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 1 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(1)}>
          Last Day
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 2 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(2)}>
          Last Week
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 3 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(3)}>
          Last Month
        </Text>
      </View>
      {topChatroom != null ? (
        topChatroom.length > 0 ? (
          <View>
            <View
              style={{
                backgroundColor: appColors.back_color,
                height: 1,
                marginTop: 8,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: appColors.primary,

                  fontWeight: '500',
                }}>
                {chatroomType == 1
                  ? 'Today'
                  : chatroomType == 2
                  ? 'Current week'
                  : 'Current Month'}
              </Text>
              {topChatroom.length > 0 ? (
                <Text
                  onPress={() => {
                    // alert('wehwehw');
                    navigation.navigate('AllRankList', {
                      screen:
                        chatroomType == 1
                          ? 'Today'
                          : chatroomType == 2
                          ? 'Current week'
                          : 'Current Month',
                      list: topChatroom,
                      type: 1,
                    });
                  }}>
                  {'All Ranks >'}
                </Text>
              ) : (
                <View />
              )}
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={topChatroom}
              style={{margin: 10}}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log('item=====', item);
                    navigation.navigate('Chatroom', {
                      room_id: item.chatRoomId,
                      roomName: item.chatRoomName,
                      userId: userId,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: appColors.white,
                    borderRadius: 4,
                    marginTop: 2,
                  }}>
                  {item.image != '' ? (
                    <Image
                      source={{uri: item.image}}
                      style={styles.imageStyle}
                    />
                  ) : (
                    <DummyUserImage height={50} width={50} />
                  )}
                  <View
                    style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: appColors.black,
                      }}>
                      {hideTextDots(item.chatRoomName, 18)}
                    </Text>
                    {/* <Text style={{color: appColors.black}}>{item.name}</Text> */}
                  </View>
                  <Image
                    source={getImage('coin')}
                    style={{alignSelf: 'center', height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: appColors.black,
                      marginLeft: 4,
                      alignSelf: 'center',
                    }}>
                    {item.coins}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>Top chatroom currently not available.</Text>
          </View>
        )
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default TopChatroom;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  tabTextStyle: {color: appColors.grey, fontWeight: 'bold', padding: 20},
  tabBarStyle: {
    marginHorizontal: 30,
    marginTop: -25,
    backgroundColor: appColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  imageStyle: {height: 50, width: 50, borderRadius: 25, alignSelf: 'center'},
});
