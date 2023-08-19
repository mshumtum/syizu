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
import {useDispatch} from 'react-redux';
import {leaderBoardGifter} from '../../../redux/actions/action';
import DummyUserImage from '../../../assets/svg/DummyUserImage';
import {useIsFocused} from '@react-navigation/native';
import ProgressModal from '../../../components/ProgressModal';
import {hideTextDots} from '../../../utils/utils';

const TopGifter = ({navigation}) => {
  const [topGifter, setTopGifter] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [giftType, setGiftType] = useState(1);
  const isFocused = useIsFocused();
  const [progressVisible, setProgressVisible] = useState(false);

  const showAllRanks = () => {
    navigation.navigate('TopCpAllRank');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setProgressVisible(true);
      setGiftType(1);
      const payload = {
        module: 'Gifter',
        type: 1,
      };

      dispatch(leaderBoardGifter({payload, callbackGifter}));
    }
  }, [isFocused]);

  const callbackGifter = response => {
    setProgressVisible(false);
    console.log('GIFTER === >', response);
    setTopGifter(response.data);
    setLastData(response.lastData);
  };

  const getGifter = type => {
    setGiftType(type);
    // setProgressVisible(true);
    const payload = {
      module: 'Gifter',
      type: type,
    };
    dispatch(leaderBoardGifter({payload, callbackGifter}));
  };

  console.log('lastData===,', lastData);
  return (
    <View style={styles.containerStyle}>
      {lastData != null && lastData.length > 0 ? (
        <ImageBackground
          source={getImage('top_gifter_leaderboard')}
          style={{height: 220, flexDirection: 'row', justifyContent: 'center'}}>
          {lastData.length > 1 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 40,
              }}>
              {lastData[1].profileImage != '' ? (
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginBottom: 8,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[1].profileImage}}
                  />

                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      position: 'absolute',
                    }}
                    source={getImage('top_gift_three')}
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

              <Text
                ellipsizeMode="head"
                numberOfLines={1}
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 10,
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
                marginTop: 25,
                marginLeft: 8,
              }}>
              {lastData[0].profileImage != '' ? (
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
                      height: 35,
                      width: 35,
                      marginBottom: 10,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[0].profileImage}}
                  />

                  <Image
                    style={{
                      height: 68,
                      width: 68,
                      position: 'absolute',
                      // top: 0.1,
                    }}
                    source={getImage('top_gift_one')}
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
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 5,
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
            <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
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
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      marginBottom: 10,
                      borderRadius: 15,
                    }}
                    source={{uri: lastData[2].profileImage}}
                  />

                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      position: 'absolute',
                    }}
                    source={getImage('top_gift_two')}
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
                //     marginLeft: 10,
                //   }}
                //   source={getImage('demoImage')}
                // />
              )}
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                {hideTextDots(lastData[2].userName)}
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
          source={getImage('top_gifter_leaderboard')}
          style={{
            height: 220,
            flexDirection: 'row',
            justifyContent: 'center',
          }}></ImageBackground>
      )}

      <View style={styles.tabBarStyle}>
        <Text
          style={[
            styles.tabTextStyle,
            {color: giftType == 1 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getGifter(1)}>
          Last Day
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: giftType == 2 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getGifter(2)}>
          Last Week
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: giftType == 3 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getGifter(3)}>
          Last Month
        </Text>
      </View>
      {topGifter != null ? (
        topGifter.length > 0 ? (
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
                  marginLeft: 10,
                  marginTop: 10,
                  fontWeight: '500',
                }}>
                {giftType == 1
                  ? 'Today'
                  : giftType == 2
                  ? 'Current week'
                  : 'Current Month'}
              </Text>

              {topGifter.length > 0 ? (
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
                      list: topGifter,
                      type: 2,
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
              data={topGifter}
              style={{margin: 5}}
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
                  <Text
                    style={{
                      fontSize: 14,
                      color: appColors.black,
                      alignSelf: 'center',
                    }}>
                    {item.coins}
                  </Text>
                  <Image
                    source={getImage('coin')}
                    style={{
                      alignSelf: 'center',
                      height: 15,
                      width: 15,
                      marginLeft: 4,
                    }}
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>Please send gift for data</Text>
          </View>
        )
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default TopGifter;

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

// function TopCPTabs() {
//   return (
//     <TabTop.Navigator
//       screenOptions={{
//         headerShown: true,
//         tabBarScrollEnabled: true,
//         tabBarIndicatorStyle: {
//           backgroundColor: appColors.primary,
//           height: 3,
//         },
//         tabBarLabelStyle: {fontWeight: 'bold', fontSize: 14},
//         tabBarActiveTintColor: appColors.primary,
//         tabBarInactiveTintColor: appColors.grey,
//       }}>
//       <TabTop.Screen name="TopCP" component={TopCP} />
//       <TabTop.Screen name="TopGifter" component={TopGifter} />
//       <TabTop.Screen name="TopChatroom" component={TopChatroom} />
//       <TabTop.Screen name="TopReceiver" component={TopReceiver} />
//     </TabTop.Navigator>
//   );
// }
