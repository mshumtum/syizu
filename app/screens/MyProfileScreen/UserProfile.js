import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {getImage} from '../../utils/getImage';
import ButtonEditProfile from '../../assets/svg/ButtonEditProfile';
import MessageIcon from '../../assets/svg/MessageIcon';
import MessageIconNew from '../../assets/svg/MessageIconNew';
import {getId} from '../../utils/localStorage';
import {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  followUser,
  getUserDetail,
  unFollowUser,
} from '../../redux/actions/action';
import {SkypeIndicator} from 'react-native-indicators';
import {useIsFocused} from '@react-navigation/native';
// import {io} from 'socket.io-client';

// const socket = io('https://chat.virtualittechnology.com/');

const UserProfile = ({navigation, route}) => {
  const {userData} = route.params;
  const [userId, setUserId] = useState('');
  const [myUserId, setMyUserId] = useState('');
  const [userDetail, setUserDetail] = useState(null);
  const [isProgressVisible, setProgressVisible] = useState(false);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const callbackUserData = val => {
    console.log('UserData===>', val);
    setProgressVisible(false);
    setUserDetail(val);
  };

  useEffect(() => {
    console.log('UserDetail ===>', userData, '   ', myUserId);
  }, [userDetail]);

  useEffect(() => {
    if (isFocused) {
      getId(setMyUserId);
      console.log('UserDataFromChatroom ===>', userData);
      setUserId(userData._id);
      const payload = {userId: userData._id};
      setProgressVisible(true);
      dispatch(getUserDetail({payload, callbackUserData}));
    }
  }, [isFocused]);

  const followUserApi = () => {
    // console.log('USER DATA==>', optionUserData);
    setProgressVisible(true);
    const payload = {
      userId: userDetail.data._id,
    };

    dispatch(followUser({payload, followUserCallback}));
  };

  const unFollowUserApi = () => {
    setProgressVisible(true);
    // console.log('USER DATA==>', optionUserData);
    const payload = {
      userId: userDetail.data._id,
    };

    dispatch(unFollowUser({payload, followUserCallback}));
  };

  const followUserCallback = val => {
    // setProgressVisible(false);
    if (val.status == 1) {
      const payload = {userId: userData._id};
      dispatch(getUserDetail({payload, callbackUserData}));
    }
  };

  return (
    <View style={styles.containerStyle}>
      {/* <ScrollView> */}
      {userDetail != null ? (
        <View
          style={{
            backgroundColor: '#fff',

            //   shadowColor: '#000',
            //   shadowOffset: {width: 1, height: 0},
            //   shadowOpacity: 0.4,
            //   shadowRadius: 3,
            //   elevation: 5,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <View style={styles.headerStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              style={{justifyContent: 'flex-end'}}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  userData: userData,
                  chatId:
                    Object.keys(userDetail.oneToOneChat).length != 0
                      ? userDetail.oneToOneChat._id
                      : 0,
                  isAccepted:
                    Object.keys(userDetail.oneToOneChat).length != 0
                      ? userDetail.oneToOneChat.isAccepted
                      : 2,
                  userId: userId,
                })
              }>
              {myUserId != userData._id ? (
                <Image
                  source={getImage('messageIcon')}
                  style={styles.imageStyle}
                />
              ) : (
                ''
              )}
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 10}}>
            {userDetail.data.coverImage != null &&
            userDetail.data.coverImage != '' ? (
              <Image
                source={{uri: userDetail.data.coverImage}}
                style={{
                  width: '100%',
                  borderRadius: 15,
                  alignSelf: 'center',
                  height: 160,
                }}
              />
            ) : (
              <Image
                source={getImage('profileCover')}
                style={{width: '100%', borderRadius: 15, alignSelf: 'center'}}
              />
            )}

            {/* <View
              style={{alignSelf: 'flex-end', marginTop: -40, marginRight: 20}}>
              <CameraWhite />
            </View> */}
          </View>
          <View
            style={{
              borderRadius: 40,
              marginTop: -40,
              backgroundColor: appColors.white,
              width: 80,
              height: 80,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={{uri: userDetail.data.profileImage}}
              style={{
                height: 70,
                width: 70,
                backgroundColor: appColors.white,
                borderRadius: 35,
              }}
            />
          </View>
          {/* <View
            style={{
              backgroundColor: appColors.primary,
              borderRadius: 22,
              height: 30,
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 80,
              marginTop: -50,
            }}>
            <CameraWhite />
          </View> */}
          <View style={{marginLeft: 100, flexDirection: 'row', marginTop: -20}}>
            <Text style={{color: appColors.black, fontWeight: 'bold'}}>
              {userDetail.data.followerUserIds.length}
            </Text>
            <Text style={{color: appColors.black, marginLeft: 3}}>
              {' '}
              Followers
            </Text>
            <View
              style={{
                height: 4,
                width: 8,
                backgroundColor: appColors.primary,
                alignSelf: 'center',
                marginHorizontal: 20,
              }}
            />
            <Text style={{color: appColors.black, fontWeight: 'bold'}}>
              {userDetail.data.followingUserIds.length}
            </Text>
            <Text style={{color: appColors.black, marginLeft: 3}}>
              {' '}
              Following
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 20}}>
            <View style={{flex: 1}}>
              <Text style={styles.normalBold}>{userData.userName}</Text>
              {/* <Text style={{color: appColors.grey}}>Name Id Code</Text> */}
            </View>
            <Image source={getImage('levelImage')} style={{marginRight: 20}} />
            <Text
              style={{
                backgroundColor: appColors.primary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                color: appColors.white,
                textAlign: 'center',
                alignSelf: 'center',
                height: 30,
                borderRadius: 5,
              }}>
              LV {userData.level}
            </Text>
          </View>

          <Text
            style={[
              styles.normalBold,
              {marginHorizontal: 20, marginBottom: 20},
            ]}>
            Bio:-
            <Text style={styles.normalText}>
              {userDetail != null
                ? userDetail.data.bio != ''
                  ? userDetail.data.bio
                  : 'Examples:- Foody Persons, Travel Lover, Friends Finder, Meet New Friends, Punjabi Culture, Dance Diwane, Fun Shun, Etc.'
                : ''}
            </Text>
          </Text>
          {myUserId != userData._id ? (
            !isProgressVisible ? (
              <TouchableOpacity
                style={{marginHorizontal: 60, marginVertical: 20}}
                onPress={() =>
                  userDetail.checkFollow === 1
                    ? unFollowUserApi()
                    : followUserApi()
                }>
                <Text
                  style={{
                    backgroundColor: appColors.primary,
                    color: appColors.white,
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: 'center',
                  }}>
                  {userDetail.checkFollow === 1 ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 50,
                }}>
                <View>
                  <SkypeIndicator color={appColors.dark_primary} size={50} />
                </View>
              </View>
            )
          ) : (
            ''
          )}
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <SkypeIndicator color={appColors.dark_primary} size={50} />
          </View>
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  textHeaderStyle: {
    color: appColors.black,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 20,
    width: 20,
  },
  headerStyle: {
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
  },
  normalBold: {fontWeight: 'bold', color: appColors.black},
  normalText: {fontWeight: 'normal', color: appColors.grey},
});
