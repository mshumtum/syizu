import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../../utils/getImage';
import LeaderboardIcon from '../../../assets/svg/LeaderboardIcon';

import {appColors} from '../../../utils/appColors';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {leaderBoardGifter} from '../../../redux/actions/action';
import {useEffect} from 'react';
import DummyUserImage from '../../../assets/svg/DummyUserImage';
import ProgressModal from '../../../components/ProgressModal';

const TopCP = ({navigation}) => {
  const [topCp, setTopCp] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [cpType, setCpType] = useState(1);
  const isFocused = useIsFocused();

  const [progressVisible, setProgressVisible] = useState(false);

  // const showAllRanks = () => {
  //   navigation.navigate('TopCpAllRank');
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setProgressVisible(true);
      setCpType(1);
      const payload = {
        module: 'Cp',
        type: 1,
      };

      dispatch(leaderBoardGifter({payload, callbackGifter}));
    }
  }, [isFocused]);

  const callbackGifter = response => {
    console.log('Chatroom === >', response.data);
    setProgressVisible(false);
    setTopCp(response.data);
    setLastData(response.lastData);
  };

  const getCp = type => {
    setCpType(type);
    const payload = {
      module: 'Cp',
      type: type,
    };
    dispatch(leaderBoardGifter({payload, callbackGifter}));
  };

  const getRelation = val => {
    if (val == 'Family') {
      return getImage('homeRel');
    } else {
      if (val == 'Lover') return getImage('loveRel');
      else return getImage('bestieRel');
    }
  };

  // const showAllRanks = () => {
  //   navigation.navigate('TopCpAllRank');
  // };

  return (
    <View style={styles.containerStyle}>
      {lastData != null && lastData.length > 0 ? (
        <ImageBackground
          source={getImage('top_cp')}
          style={{height: 220, flexDirection: 'row'}}>
          {lastData.length > 1 ? (
            <View
              style={{
                alignItems: 'center',
                marginTop: 50,
                marginLeft: 30,
              }}>
              {lastData[1].createdBy.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                    marginLeft: 10,
                  }}
                  source={{uri: lastData[1].createdBy.profileImage}}
                />
              ) : (
                <DummyUserImage height={30} width={30} />
              )}
              {lastData[1].otherUserId.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 30,
                    marginTop: -20,
                    borderRadius: 15,
                  }}
                  source={{uri: lastData[1].otherUserId.profileImage}}
                />
              ) : (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 20,
                    marginTop: -20,
                  }}>
                  <DummyUserImage height={40} width={40} />
                </View>
              )}

              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 5,
                }}>
                {lastData[1].createdBy.userName}
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
                alignItems: 'center',
                marginTop: 20,
              }}>
              {lastData[0].createdBy.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                    marginLeft: 10,
                  }}
                  source={{uri: lastData[0].createdBy.profileImage}}
                />
              ) : (
                <DummyUserImage height={30} width={30} />
              )}
              {lastData[0].otherUserId.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 30,
                    marginTop: -20,
                    borderRadius: 15,
                  }}
                  source={{uri: lastData[0].otherUserId.profileImage}}
                />
              ) : (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 20,
                    marginTop: -20,
                  }}>
                  <DummyUserImage height={40} width={40} />
                </View>
              )}

              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 5,
                }}>
                {lastData[0].createdBy.userName}
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
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 30,
                marginTop: 50,
              }}>
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

              {lastData[2].createdBy.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 8,
                    borderRadius: 15,
                    marginLeft: 10,
                  }}
                  source={{uri: lastData[2].createdBy.profileImage}}
                />
              ) : (
                <DummyUserImage height={30} width={30} />
              )}
              {lastData[2].otherUserId.profileImage != '' ? (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 20,
                    marginTop: -20,
                    borderRadius: 15,
                  }}
                  source={{uri: lastData[2].otherUserId.profileImage}}
                />
              ) : (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 20,
                    marginTop: -20,
                  }}>
                  <DummyUserImage height={40} width={40} />
                </View>
              )}

              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.text_grey,
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                {lastData[2].createdBy.userName}
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
          source={getImage('top_cp')}
          style={{height: 220, flexDirection: 'row', justifyContent: 'center'}}
        />
      )}

      <View style={styles.tabBarStyle}>
        <Text
          style={[
            styles.tabTextStyle,
            {color: cpType == 1 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getCp(1)}>
          Last Day
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: cpType == 2 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getCp(2)}>
          Last Week
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: cpType == 3 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getCp(3)}>
          Last Month
        </Text>
      </View>

      {topCp != null ? (
        topCp.length > 0 ? (
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
              {cpType == 1
                ? 'Today'
                : cpType == 2
                ? 'Current week'
                : 'Current Month'}
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={topCp}
              style={{margin: 10}}
              renderItem={({item, index}) => (
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{flex: 3, flexDirection: 'row'}}>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      {item.createdBy.profileImage != '' ? (
                        <Image
                          style={{height: 40, width: 40, borderRadius: 20}}
                          source={{uri: item.createdBy.profileImage}}
                        />
                      ) : (
                        <DummyUserImage height={40} width={40} />
                      )}
                      <Text style={{color: appColors.black}}>
                        {' '}
                        {item.createdBy.userName}{' '}
                      </Text>
                    </View>
                    <Image
                      style={{
                        flex: 1,
                        marginTop: 20,
                        marginHorizontal: -20,
                        height: 20,
                      }}
                      source={getRelation(item.cpType)}
                    />
                    <View style={{alignItems: 'center'}}>
                      {item.otherUserId.profileImage != '' ? (
                        <Image
                          style={{height: 40, width: 40, borderRadius: 20}}
                          source={{uri: item.otherUserId.profileImage}}
                        />
                      ) : (
                        <DummyUserImage height={40} width={40} />
                      )}
                      <Text style={{color: appColors.black}}>
                        {' '}
                        {item.otherUserId.userName}{' '}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1.5,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Image source={getImage('coin')} />
                    <Text style={{color: appColors.black}}>{item.coins}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>CP currently not available.</Text>
          </View>
        )
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default TopCP;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: appColors.white,
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
    borderWidth: 1,
    borderColor: appColors.back_color,
  },
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
