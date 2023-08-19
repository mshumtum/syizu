import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from '../../utils/appColors';
import SearchIcon from '../../assets/svg/SearchIcon';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import { getImage } from '../../utils/getImage';
import { setLanguage, useTranslation } from 'react-multi-lang';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeData, joinRoom } from '../../redux/actions/action';
import { count, log } from 'console';
import { getId, getLang } from '../../utils/localStorage';
import { useIsFocused } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import SyizuLogo from '../../assets/svg/SyizuLogo';
import ProgressModal from '../../components/ProgressModal';
import ExitOptionModal from '../../components/ExitOptionModal';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoModal from '../../components/VideoModal';
import Carousel from 'react-native-snap-carousel';

const HomeScreen = ({ navigation }) => {
  const t = useTranslation();

  const [images, setimages] = useState([
    { src: getImage('banner'), key: '1' },
    { src: getImage('banner'), key: '2' },
    { src: getImage('banner'), key: '3' },
  ]);

  const isFocused = useIsFocused();

  const [progressVisible, setProgressVisible] = useState(false);

  const [allChatroom, setAllChatroom] = useState([]);

  const [activeChatData, setActiveChatData] = useState(null);

  const activeChatData2 = useSelector(state => state.getHomeData);
  const [userId, setUserId] = useState('');
  const [flag, setFlag] = useState('');

  const createChatroom = () => {
    navigation.navigate('CreateChatroom');
  };

  const chatroom = ' Chatrooms';
  const franchise = ' Franchise';
  const room = ' Room';

  const dispatch = useDispatch();
  const callBack = val => {
    console.log('ValHome==>', val.myFranchise);
    if (val.status == 0) {
      AsyncStorage.clear();
      showToast('You are logged out.');
      navigation.navigate('LanguageScreen');
    } else {
      setProgressVisible(false);
      setActiveChatData(val);
      // var arr = [];
      // setAllChatroom(arr);
      if (allChatroom.length == 0) {
        for (let i = 0; i < val.joinedRoom.length; i++) {
          allChatroom.push(val.joinedRoom[i]);
          // console.log('All Chatroom', val.joinedRoom[i], '  ', allChatroom);
          if (i == val.joinedRoom.length - 1) {
            setAllChatroom(allChatroom);
            // setFlag(!flag);
          }
        }

        for (let i = 0; i < val.availableRooms.length; i++) {
          allChatroom.push(val.availableRooms[i]);
          if (i == val.availableRooms.length - 1) {
            setAllChatroom(allChatroom);
            setFlag(!flag);
          }
        }
      }

      setRefreshing(false);
    }
  };
  const payload = '';
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(getHomeData({ callBack }));
  }, [refreshing]);

  const joinCallback = val => {
    console.log('Join Callback==>', val);

    // setIndeterminate(true);
    // setJoinData(val);
    // dispatch(getAllChatroom({callBack}));
    if (val.status == 1) {
      if (val.message != 'You are blocked for this chat room') {
        if (val.message != 'Request to join room has been sent.') {
          console.log('val IsAdded===>', val);
          navigation.navigate('Chatroom', {
            room_id: val.data.chatRoomId,
            roomName: val.data.chatRoomName,
            userId: userId,
          });
        } else {
          showToast('Request sent to admin for join please wait...');
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
  // useEffect(() => {
  //   if (isFocused) {

  //   }
  // }, []);

  const joinRoomApi = roomId => {
    const payload = {
      chatRoomId: roomId,
    };
    console.log('Room Id==>', payload);
    // const payload = encrypted(data);
    dispatch(joinRoom({ payload, joinCallback }));
  };

  useEffect(() => {
    if (isFocused) {
      getId(setUserId);
      console.log('Refresh===>', isFocused);
      setProgressVisible(true);
      dispatch(getHomeData({ callBack }));
      console.log('Home==>', activeChatData2);
      const backAction = () => {
        // setExitModalVisible(true);
        Alert.alert('Syizu!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
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

  const getOnlineCount = members => {
    const count = members.filter(obj => obj.socketId !== '').length;
    return count;
  };

  return (
    <View style={styles.containerStyle}>
      {/* {getToken()} */}
      {/* <ImageBackground source={getImage('background')} style={{flex: 1}}> */}
      {activeChatData != null ? (
        <ScrollView
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
            {/* <TouchableOpacity
              style={{alignSelf: 'flex-end', marginEnd: 16, marginBottom: 2}}
              onPress={() => navigation.navigate('AudioRequest')}>
              <Image
                source={getImage('bell')}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginEnd: 16, marginBottom: 2 }}
              onPress={() => navigation.navigate('Search', { userId: userId })}>
              <SearchIcon />
            </TouchableOpacity>
            {activeChatData.myRoom.length == 0 ? (
              <TouchableOpacity
                style={{ alignSelf: 'flex-end' }}
                onPress={createChatroom}>
                <AddChatIcon />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
          {/* <Image source={require('../../assets/images/banner.png')}></Image> */}

          {activeChatData.banners.length > 0 ? (

            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={activeChatData.banners}
              renderItem={({ item, index }) => (
                <Image
                  onPress={() => navigation.navigate('WalletScreen')}
                  source={{
                    uri: item.image,
                  }}
                  key={item.key}
                  resizeMethod="scale"
                  style={{
                    width: 300,
                    height: 120,
                    flexWrap: 'wrap',
                    borderWidth: 2,
                    borderRadius: 16,
                    //   borderColor: '#d35647',
                    //   resizeMode: 'contain',
                    marginLeft: 16,
                    marginTop: 8,
                  }}

                />
              )}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={300}
              autoplay={true}
              loop={true}

            // autoplayInterval={2000}
            />

            // <FlatList
            //   horizontal={true}
            //   showsHorizontalScrollIndicator={false}
            //   data={activeChatData.banners}

            // />
          ) : (
            null
          )}
          {activeChatData.myRoom.length > 0 ? (
            <View style={{ marginTop: 16, marginHorizontal: 16 }}>
              <Text style={styles.frontTextStyle}>
                {t('Active')}{' '}
                <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Chatroom', {
                    room_id: activeChatData.myRoom[0].chatRoomId,
                    roomName: activeChatData.myRoom[0].chatRoomName,
                    userId: userId,
                  })
                }
                style={{
                  backgroundColor: appColors.white,
                  borderRadius: 10,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                {activeChatData.myRoom[0].image != '' ? (
                  <Image
                    source={{ uri: activeChatData.myRoom[0].image }}
                    style={{
                      marginVertical: 10,
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginHorizontal: 10,
                    }}
                  />
                ) : (
                  <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <DummyUserImage height={50} width={50} />
                  </View>
                )}
                {/* <Text
                  style={{
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    backgroundColor: appColors.primary,
                    marginLeft: -30,
                    borderRadius: 9,
                    fontSize: 10,
                    color: appColors.white,
                    marginTop: 8,
                  }}>
                  20
                </Text> */}
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={styles.primaryTextColor}>
                    {activeChatData != null
                      ? activeChatData.myRoom[0].chatRoomName
                      : 'Chatroom Name'}
                  </Text>
                  {getOnlineCount(activeChatData.myRoom[0].members) > 0 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={getImage('activechat')} />
                      <Text style={{ color: appColors.black }}>
                        {' '}
                        {getOnlineCount(activeChatData.myRoom[0].members)}{' '}
                        online
                      </Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 4,
                          backgroundColor: appColors.red,
                        }}
                      />
                      <Text style={{ color: appColors.black }}>{' offline'}</Text>
                    </View>
                  )}
                </View>
                <Image
                  source={getImage('rightArrow')}
                  style={{ marginLeft: 50 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}
          {activeChatData.joinedRoom.length > 0 ? (
            <View style={{ marginLeft: 16, marginTop: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('My')}{' '}
                  <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyChatrooms')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: appColors.primary,
                      marginRight: 16,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={activeChatData.joinedRoom}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chatroom', {
                        room_id: activeChatData.joinedRoom[index].chatRoomId,
                        roomName: activeChatData.joinedRoom[index].chatRoomName,
                        userId: userId,
                      })
                    }
                    style={{ flex: 1, width: 105, height: 180, marginRight: 8 }}>
                    <ImageBackground
                      source={getImage('itemBack')}
                      style={styles.itemStyle}>
                      {item.image ? (
                        <Image
                          style={styles.imageStyle}
                          source={{
                            uri: item.image,
                          }} /* Use item to set the image source */
                          key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                        />
                      ) : (
                        <View style={{ marginVertical: 10 }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                      )}
                      <Text
                        style={{
                          color: appColors.primary,
                          fontSize: 12,
                        }}>
                        {item.chatRoomName}
                      </Text>
                      {getOnlineCount(item.members) > 0 ? (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={getImage('activechat')} />
                          <Text style={{ color: appColors.black }}>
                            {' '}
                            {getOnlineCount(item.members)} online
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: appColors.red,
                            }}
                          />
                          <Text style={{ color: appColors.black }}>
                            {' offline'}
                          </Text>
                        </View>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            ''
          )}

          {activeChatData.availableRooms.length > 0 ? (
            <View style={{ marginLeft: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('Join')}{' '}
                  <Text style={styles.headerTextStyle}> {t('Chatroom')}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllChatrooms')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: appColors.primary,
                      marginRight: 16,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={activeChatData.availableRooms}
                styles={{ justifyContent: 'center' }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={
                      () => joinRoomApi(item.chatRoomId)
                      // navigation.navigate('Chatroom', {
                      //   room_id:
                      //     activeChatData.availableRooms[index].chatRoomId,
                      //   roomName:
                      //     activeChatData.availableRooms[index].chatRoomName,
                      // })
                    }
                    style={{
                      flex: 1,
                      width: 105,
                      height: 180,
                      marginRight: 8,

                      // borderWidth: 1,
                      // borderColor: appColors.light_grey,
                    }}>
                    <ImageBackground
                      source={getImage('itemBack')}
                      style={styles.itemStyle}>
                      {item.image != '' ? (
                        <Image
                          style={styles.imageStyle}
                          source={{
                            uri: item.image,
                          }} /* Use item to set the image source */
                          key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                        />
                      ) : (
                        <View style={{ marginVertical: 10 }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                      )}
                      <Text
                        style={{
                          color: appColors.primary,
                          fontSize: 12,
                        }}>
                        {item.chatRoomName}
                      </Text>
                      {getOnlineCount(item.members) > 0 ? (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={getImage('activechat')} />
                          <Text style={{ color: appColors.black }}>
                            {' '}
                            {getOnlineCount(item.members)} online
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: appColors.red,
                            }}
                          />
                          <Text style={{ color: appColors.black }}>
                            {' offline'}
                          </Text>
                        </View>
                      )}
                      {/* <Text
                        style={{
                          backgroundColor: appColors.primary,
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          fontSize: 10,
                          color: appColors.white,
                          borderRadius: 5,
                          marginTop: 8,
                        }}>
                        Join
                      </Text> */}
                      <Text></Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            ''
          )}
          {Object.keys(activeChatData.myFranchise).length != 0 ? (
            <TouchableOpacity
              style={{ margin: 16 }}
              onPress={
                () =>
                  // console.log("Check User Id ===> ",activeChatData.myFranchise.userId);
                  // activeChatData.myFranchise.userId._id == userId
                  //   ?
                  navigation.navigate('FranchiseProfile', {
                    userId: activeChatData.myFranchise._id,
                    name: activeChatData.myFranchise.franchiseId.name,
                    fsize: activeChatData.myFranchise.members.length,
                    from: 1,
                    image: '',
                  })
                // : navigation.navigate('Franchise')
              }>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('My')}
                  <Text style={styles.headerTextStyle}> {t('Franchise')}</Text>
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: appColors.white,
                  borderRadius: 10,
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View style={{ margin: 10 }}>
                  <DummyUserImage height={50} width={50} />
                </View>
                {/* <Text
                  style={{
                    width: 18,
                    height: 18,
                    textAlign: 'center',
                    backgroundColor: appColors.primary,
                    marginLeft: -30,
                    borderRadius: 9,
                    fontSize: 10,
                    color: appColors.white,
                    marginTop: 8,
                  }}>
                  20
                </Text> */}

                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.primaryTextColor}>
                    {activeChatData.myFranchise.franchiseId.name}
                  </Text>
                  {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={getImage('activechat')} />
                    <Text style={{color: appColors.black}}> {getOnlineCount()} online</Text>
                  </View> */}
                </View>
                <Image
                  source={getImage('rightArrow')}
                  style={{ marginRight: 10 }}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Franchise', {
                  userId: userId,
                })
              }
              style={{
                backgroundColor: appColors.light_purple,
                marginHorizontal: 10,
                borderRadius: 10,
                marginTop: 8,
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                padding: 10,
              }}>
              <SyizuLogo height={50} width={100} />
              <Text
                style={{
                  color: appColors.primary,
                  fontSize: 16,
                  backgroundColor: appColors.white,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  marginLeft: 20,
                }}>
                {' '}
                Join Franchise
              </Text>
            </TouchableOpacity>
          )}
          {activeChatData.warDetails.length > 0 ? (
            <View style={{ margin: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>{t('War Room')}</Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={activeChatData.warDetails}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: appColors.white,
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      marginRight: 10,
                      marginTop: 10,
                    }}>
                    <ImageBackground
                      source={getImage('battleBack')}
                      resizeMode={'contain'}
                      style={{
                        flexDirection: 'row',
                        height: 130,
                        width: 300,
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() =>
                          navigation.navigate('Chatroom', {
                            room_id: item.warData.warRoomChatId.chatRoomId,
                            roomName: item.warData.warRoomChatId.chatRoomName,
                            userId: userId,
                          })
                        }>
                        {/* <Image
                          source={getImage('demoImage')}
                          style={{
                            height: 60,
                            width: 60,
                            marginBottom: 5,
                          }}
                        /> */}
                        <View style={{ marginBottom: 5 }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                        <Text
                          style={{
                            color: appColors.white,
                            alignSelf: 'center',
                            fontSize: 10,
                            marginLeft: 5,
                            fontWeight: '500',
                          }}>
                          {item.warChatRoomUser.userName}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                        onPress={() =>
                          navigation.navigate('Chatroom', {
                            room_id: item.warData.warOtherRoomChatId.chatRoomId,
                            roomName:
                              item.warData.warOtherRoomChatId.chatRoomName,
                            userId: userId,
                          })
                        }>
                        <Text
                          style={{
                            color: appColors.white,
                            alignSelf: 'center',
                            fontSize: 10,
                            fontWeight: '500',
                          }}>
                          {item.warOtherChatRoomUser.userName}
                        </Text>
                        {/* <Image
                          source={getImage('demoImage')}
                          style={{
                            height: 60,
                            width: 60,
                            marginLeft: 12,
                            marginBottom: 5,
                            alignSelf: 'flex-end',
                          }}
                        /> */}
                        <View
                          style={{
                            marginLeft: 10,
                            marginBottom: 5,
                            alignSelf: 'flex-end',
                          }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                )}
              />
            </View>
          ) : (
            <View></View>
          )}
          {activeChatData.trendingChatRoom.length > 0 ? (
            <View style={{ margin: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('Trending')}
                  <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TrendingChatroom')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: appColors.primary,
                      marginRight: 16,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={activeChatData.trendingChatRoom}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chatroom', {
                        room_id: item.chatRoomId,
                        roomName: item.chatRoomName,
                        userId: userId,
                      })
                    }
                    style={{
                      backgroundColor: appColors.white,
                      borderRadius: 10,
                      marginTop: 8,
                      marginRight: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                      width: '100%',
                    }}>
                    {item.image != '' ? (
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          marginTop: 10,
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginBottom: 10,
                          marginHorizontal: 10,
                        }}
                      />
                    ) : (
                      <View style={{ marginVertical: 10 }}>
                        <DummyUserImage height={50} width={50} />
                      </View>
                    )}
                    <Text
                      style={{
                        width: 18,
                        height: 18,
                        textAlign: 'center',
                        backgroundColor: appColors.primary,
                        marginLeft: -30,
                        borderRadius: 9,
                        fontSize: 10,
                        color: appColors.white,
                        marginTop: 8,
                      }}>
                      20
                    </Text>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={styles.primaryTextColor}>
                        {item.chatRoomName}
                      </Text>
                      {getOnlineCount(item.members) > 0 ? (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={getImage('activechat')} />
                          <Text style={{ color: appColors.black }}>
                            {' '}
                            {getOnlineCount(item.members)} online
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: appColors.red,
                            }}
                          />
                          <Text style={{ color: appColors.black }}>
                            {' offline'}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Image
                      source={getImage('rightArrow')}
                      style={{ marginLeft: 50, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            ''
          )}
          {/* <Image
            source={getImage('adsImage')} 
            resizeMethod="scale"
            style={{
              // width: 300,
              // height: 150,
              flexWrap: 'wrap',
              borderWidth: 2,

              //   borderColor: '#d35647',
              //   resizeMode: 'contain',
            }}
          /> */}

          {activeChatData.topChatRoom.length > 0 ? (
            <View style={{ marginLeft: 16, marginTop: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('Top')}{' '}
                  <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TopChatroom')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: appColors.primary,
                      marginRight: 16,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={activeChatData.topChatRoom}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: 120,
                      height: 180,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate('Chatroom', {
                        room_id: item.chatRoomId,
                        roomName: item.chatRoomName,
                        userId: userId,
                      })
                    }>
                    <ImageBackground
                      source={getImage('itemBack')}
                      style={styles.itemStyle}>
                      {item.image ? (
                        <Image
                          style={{ width: 50, height: 50, borderRadius: 25 }}
                          source={{
                            uri: item.image,
                          }} /* Use item to set the image source */
                          key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                        />
                      ) : (
                        <View style={{ marginVertical: 10 }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                      )}
                      <Text
                        style={{
                          color: appColors.primary,
                          fontSize: 12,
                        }}>
                        {item.chatRoomName}
                      </Text>
                      {getOnlineCount(
                        activeChatData.topChatRoom[index].members,
                      ) > 0 ? (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={getImage('activechat')} />
                          <Text style={{ color: appColors.black }}>
                            {' '}
                            {getOnlineCount(
                              activeChatData.topChatRoom[index].members,
                            )}{' '}
                            online
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: appColors.red,
                            }}
                          />
                          <Text style={{ color: appColors.black }}>
                            {' offline'}
                          </Text>
                        </View>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            ''
          )}

          {allChatroom.length > 0 ? (
            <View style={{ marginLeft: 16 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.frontTextStyle}>
                  {t('All')}{' '}
                  <Text style={styles.headerTextStyle}>{t('Chatroom')}</Text>
                </Text>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('AllChatrooms')}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: appColors.primary,
                      marginRight: 16,
                    }}>
                    See More
                  </Text>
                </TouchableOpacity> */}
              </View>

              <FlatList
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                data={allChatroom}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: 120,
                      height: 180,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate('Chatroom', {
                        room_id: item.chatRoomId,
                        roomName: item.chatRoomName,
                        userId: userId,
                      })
                    }>
                    <ImageBackground
                      source={getImage('itemBack')}
                      style={styles.itemStyle}>
                      {item.image ? (
                        <Image
                          style={styles.imageStyle}
                          source={{
                            uri: item.image,
                          }} /* Use item to set the image source */
                          key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                        />
                      ) : (
                        <View style={{ marginVertical: 10 }}>
                          <DummyUserImage height={50} width={50} />
                        </View>
                      )}
                      <Text
                        style={{
                          color: appColors.primary,
                          fontSize: 12,
                        }}>
                        {item.chatRoomName}
                      </Text>
                      {getOnlineCount(item.members) > 0 ? (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={getImage('activechat')} />
                          <Text style={{ color: appColors.black }}>
                            {' '}
                            {getOnlineCount(item.members)} online
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View
                            style={{
                              height: 8,
                              width: 8,
                              borderRadius: 4,
                              backgroundColor: appColors.red,
                            }}
                          />
                          <Text style={{ color: appColors.black }}>
                            {' offline'}
                          </Text>
                        </View>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            ''
          )}
        </ScrollView>
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

{
  /* <View
  style={{
    backgroundColor: appColors.white,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  }}>
  <Image
    source={getImage('groupImage')}
    style={{marginTop: 10, width: 80, height: 80}}
  />
  <Text
    style={{
      width: 18,
      height: 18,
      textAlign: 'center',
      backgroundColor: appColors.primary,
      marginLeft: -30,
      borderRadius: 9,
      fontSize: 10,
      color: appColors.white,
      marginTop: 8,
    }}>
    20
  </Text>
  <View style={{marginLeft: 16}}>
    <Text style={styles.primaryTextColor}>Active Chatroom Name</Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={getImage('activechat')} />
      <Text> 10 online</Text>
    </View>
  </View>
  <Image source={getImage('rightArrow')} style={{marginLeft: 50}} />
</View>; */
}

export default HomeScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.back_color,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
  },
  frontTextStyle: {
    fontSize: 20,
    color: appColors.primary,
    flex: 1,
  },
  primaryTextColor: {
    color: appColors.primary,
    fontWeight: 'bold',
  },
  itemStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginVertical: 10,
  },
});
