import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
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
import {hideTextDots} from '../../../utils/utils';

const TopReceiver = () => {
  const [topChatroom, setTopChatroom] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [chatroomType, setChatroomType] = useState(1);
  const isFocused = useIsFocused();
  const [progressVisible, setProgressVisible] = useState(false);

  const showAllRanks = () => {
    navigation.navigate('TopCpAllRank');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setProgressVisible(true);
      setChatroomType(1);
      const payload = {
        module: 'Receiver',
        type: 1,
      };

      dispatch(leaderBoardGifter({payload, callbackGifter}));
    }
  }, [isFocused]);

  const callbackGifter = response => {
    console.log('Receiver === >', response);
    setProgressVisible(false);
    setTopChatroom(response.data);
    setLastData(response.lastData);
  };

  const getChatroom = type => {
    setChatroomType(type);
    const payload = {
      module: 'Receiver',
      type: type,
    };
    dispatch(leaderBoardGifter({payload, callbackGifter}));
  };

  return (
    <View style={styles.containerStyle}>
      {lastData != null && lastData.length > 0 ? (
        <ImageBackground
          source={getImage('top_received')}
          style={{height: 220, flexDirection: 'row', justifyContent: 'center'}}>
          {lastData.length > 1 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 45,
              }}>
              {lastData[1].profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                  }}
                  source={{uri: lastData[1].profileImage}}
                />
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
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 5,
                }}>
                {hideTextDots(lastData[1].userName)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 16, width: 16}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[1].coins}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}
          {lastData.length > 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 30,
                marginLeft: 8,
              }}>
              {lastData[0].profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                  }}
                  source={{uri: lastData[0].profileImage}}
                />
              ) : (
                <DummyUserImage height={40} width={40} />
              )}
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 10,
                }}>
                {hideTextDots(lastData[0].userName)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[0].coins}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}

          {lastData.length > 2 ? (
            <View style={{flex: 1, alignItems: 'center', marginTop: 70}}>
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

              {lastData[2].profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                    marginLeft: 10,
                  }}
                  source={{uri: lastData[2].profileImage}}
                />
              ) : (
                <DummyUserImage height={40} width={40} />
              )}

              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                {lastData[2].userName}
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Image
                  style={{height: 20, width: 20}}
                  source={getImage('coin')}
                />
                <Text style={{fontWeight: 'bold', color: appColors.text_grey}}>
                  {lastData[2].coins}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, alignItems: 'center'}} />
          )}
        </ImageBackground>
      ) : (
        <ImageBackground
          source={getImage('top_received')}
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
            <Text
              style={{
                color: appColors.primary,
                marginLeft: 10,
                marginTop: 10,
                fontWeight: '500',
              }}>
              {chatroomType == 1
                ? 'Today'
                : chatroomType == 2
                ? 'Current week'
                : 'Current Month'}
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={topChatroom}
              style={{margin: 10}}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: appColors.white,
                    borderRadius: 4,
                    marginTop: 2,
                  }}>
                  {item.profileImage != '' ? (
                    <Image
                      source={{uri: item.profileImage}}
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
                      {item.userName}
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
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>Receiver data not available</Text>
          </View>
        )
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default TopReceiver;
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
