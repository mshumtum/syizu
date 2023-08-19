import {
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../utils/getImage';
import {appColors} from '../../utils/appColors';
import SearchIcon from '../../assets/svg/SearchIcon';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import WhiteBackArrow from '../../assets/svg/WhiteBackArrow';
import PublicImage from '../../assets/svg/PublicImage';

import {useTranslation} from 'react-multi-lang';

import Contacts from 'react-native-contacts';
import MessageList from '../MessageScreen/MessageList/MessageList';
import MessageRequest from '../MessageScreen/MessageRequest/MessageRequest';
import AllMemberList from './AllMember';
import FranchiseRequest from './FranchiseRequest';
import {franchiseDetail} from '../../redux/actions/action';
import {useEffect} from 'react';
import CrossIcon from '../../assets/svg/CrossIcon';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import DummyUserImage from '../../assets/svg/DummyUserImage';

const Tab = createMaterialTopTabNavigator();

function MyFranchiseTabs({franchiseId}) {
  const t = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'AllMemberList'}
        component={AllMemberList}
        initialParams={{franchiseId: franchiseId}}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
      <Tab.Screen
        name={'FranchiseRequest'}
        component={FranchiseRequest}
        initialParams={{franchiseId: franchiseId}}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
    </Tab.Navigator>
  );
}

const FranchiseProfile = ({navigation, route}) => {
  const t = useTranslation();

  const [memberList, setMemberList] = useState([]);
  const [chatroomList, setChatroomList] = useState(null);

  const {userId, name, fsize, from, image} = route.params;

  const dispatch = useDispatch();

  const callbackFranchiseData = val => {
    console.log('Franchise Members Inner', val.chatRoom);
    setMemberList(val.data.members);
    setChatroomList(val.chatRooms);
  };

  useEffect(() => {
    console.log('Franchise ID ==> ', image);
    const payload = {userId: userId};
    dispatch(franchiseDetail({payload, callbackFranchiseData}));
  }, []);

  return (
    <View style={styles.containerStyle}>
      <View style={{backgroundColor: appColors.white}}>
        <ImageBackground
          source={getImage('profileCover')}
          style={{
            width: '100%',
            alignItems: 'center',
            height: 160,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginLeft: 16}}
              onPress={() => navigation.goBack()}>
              <WhiteBackArrow />
            </TouchableOpacity>
            <Text style={styles.headerTextStyle}>{name}</Text>
            {/* <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginEnd: 8,
                flexDirection: 'row',
              }}>
              <SearchIcon />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
        <View
          style={{
            borderRadius: 40,
            marginTop: -40,
            backgroundColor: appColors.white,
            width: 80,
            height: 80,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {image != '' ? (
            <Image
              source={{uri: image}}
              style={{
                height: 70,
                width: 70,
                backgroundColor: appColors.white,
                borderRadius: 35,
              }}
            />
          ) : (
            <DummyUserImage height={70} width={70} />
          )}
        </View>
        <View style={{marginLeft: 100, flexDirection: 'row', marginTop: -30}}>
          <Text style={{color: appColors.black, fontWeight: 'bold', flex: 1}}>
            {name}
          </Text>
          <TouchableOpacity style={{height: 20, width: 20}}>
            <PublicImage />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 10, color: appColors.black}}>
            {fsize}
          </Text>
        </View>
        <Text style={styles.normalText}>
          Foody Persons, Travel Lover, Friends Finder, Meet New Friends, Punjabi
          Culture, Dance Diwane, Fun Shun, Etc.
        </Text>
      </View>
      {from == 0 ? (
        <ScrollView style={{flex: 1}}>
          {chatroomList != null && chatroomList.length > 0 ? (
            <Text
              style={{
                color: appColors.primary,
                backgroundColor: appColors.white,
                fontSize: 18,
                marginTop: 10,
                paddingLeft: 16,
                fontWeight: '500',
              }}>
              My<Text style={{color: appColors.grey}}> Chatrooms</Text>
            </Text>
          ) : (
            ''
          )}
          {chatroomList != null ? (
            <FlatList
              horizontal={true}
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              data={chatroomList}
              style={{paddingHorizontal: 10}}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Chatroom', {
                      room_id: item.chatRoomId,
                      roomName: item.chatRoomName,
                      userId: userId,
                    })
                  }
                  style={{
                    flex: 1,
                    width: 90,
                    height: 150,
                    marginRight: 10,
                    paddingVertical: 10,
                  }}>
                  <ImageBackground
                    source={getImage('itemBack')}
                    style={styles.itemStyle}>
                    {item.image != '' ? (
                      <Image
                        source={{uri: item.image}}
                        key={index}
                        style={{
                          height: 48,
                          width: 48,
                          borderRadius: 24,
                          marginTop: 10,
                        }}
                      />
                    ) : (
                      <View style={{marginTop: 10}}>
                        <DummyUserImage height={48} width={48} />
                      </View>
                    )}
                    <Text
                      style={{
                        color: appColors.primary,
                        fontSize: 12,
                        marginTop: 10,
                        paddingHorizontal: 10,
                      }}
                      numberOfLines={2}>
                      {item.chatRoomName}
                    </Text>
                    {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={getImage('activechat')} />
                      <Text style={{color: appColors.black}}>
                        10 online
                      </Text>
                    </View> */}
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          ) : (
            ''
          )}
          <View style={{flex: 1}}>
            <Text
              style={{
                color: appColors.primary,
                backgroundColor: appColors.white,
                fontSize: 18,
                marginTop: 10,
                paddingLeft: 16,
                fontWeight: '500',
              }}>
              All<Text style={{color: appColors.grey}}> Members</Text>
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              data={memberList}
              style={{
                backgroundColor: appColors.back_color,
                flex: 1,
                marginTop: 10,
              }}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: appColors.white,
                    marginBottom: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  {item.userId.profileImage != '' ? (
                    <Image
                      style={{
                        justifyContent: 'center',
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}
                      source={{
                        uri: item.userId.profileImage,
                      }} /* Use item to set the image source */
                      key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                    />
                  ) : (
                    <View>
                      <DummyUserImage height={50} width={50} />
                    </View>
                  )}
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text
                      style={{
                        color: appColors.black,
                        fontSize: 14,
                        marginLeft: 5,
                      }}>
                      {item.userId.userName}
                    </Text>
                    <View style={{flexDirection: 'row', marginLeft: 5}}>
                      <Text
                        style={{
                          color: appColors.white,
                          backgroundColor: appColors.primary,
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                          borderRadius: 4,
                          fontSize: 10,
                        }}>
                        LV {item.userId.level}
                      </Text>
                      <View style={{flex: 1}} />
                    </View>
                  </View>
                  {/* <View
                  style={{
                    alignItems: 'flex-end',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CrossIcon />
                </View> */}
                </View>
              )}
            />
          </View>
        </ScrollView>
      ) : (
        <MyFranchiseTabs franchiseId={userId} />
      )}
    </View>
  );
};

export default FranchiseProfile;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.white,
    flex: 1,
    marginLeft: 20,
  },
  flatList: {
    height: 100,
    flexGrow: 0,
  },

  normalBold: {fontWeight: 'bold', color: appColors.black},
  normalText: {
    fontWeight: 'normal',
    color: appColors.grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
