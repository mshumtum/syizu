import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import CrossIcon from '../../../assets/svg/CrossIcon';
import {useEffect} from 'react';
import {
  franchiseDetail,
  removeUserFromFranchise,
} from '../../../redux/actions/action';
import {useDispatch} from 'react-redux';
import {getId} from '../../../utils/localStorage';

import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import DummyUserImage from '../../../assets/svg/DummyUserImage';

const AllMemberList = ({navigation, route}) => {
  const [memberList, setMemberList] = useState([]);
  const [chatroomList, setChatroomList] = useState(null);

  const [userId, setUserId] = useState();

  const {franchiseId} = route.params;

  const dispatch = useDispatch();

  const callbackFranchiseData = val => {
    console.log('Franchise Members Inner', val.chatRooms);
    setMemberList(val.data.members);
    setChatroomList(val.chatRooms);
  };

  // useEffect(() => {
  //   console.log('Franchise ID ==> ', franchiseId);
  //   const payload = {userId: franchiseId};
  //   dispatch(franchiseDetail({payload, callbackFranchiseData}));
  // }, [franchiseId]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getId(setUserId);
      console.log('Refresh===>', isFocused);
      const payload = {userId: franchiseId};
      dispatch(franchiseDetail({payload, callbackFranchiseData}));
    }
    // getToken();
  }, [isFocused]);

  const removeUser = userId => {
    const payload = {
      franchiseId: franchiseId,
      userId: userId,
    };

    dispatch(removeUserFromFranchise({payload, callbackRemove}));
  };

  const callbackRemove = val => {
    const payload = {userId: franchiseId};
    dispatch(franchiseDetail({payload, callbackFranchiseData}));
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: appColors.white, flex: 1}}>
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
            key={'_'}
            horizontal={true}
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
                  <Image
                    source={{uri: item.image}}
                    key={index}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      marginTop: 10,
                    }}
                  />
                  <Text
                    style={{
                      color: appColors.primary,
                      fontSize: 12,
                    }}>
                    {item.chatRoomName}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={getImage('activechat')} />
                    <Text style={{color: appColors.black}}>
                      10 online
                      {/* {item.online} */}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        ) : (
          ''
        )}
        {memberList != null ? (
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
        ) : (
          ''
        )}
        <FlatList
          key={'#'}
          showsHorizontalScrollIndicator={false}
          data={memberList}
          nestedScrollEnabled
          style={{backgroundColor: appColors.back_color}}
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
              <View style={{flex: 1}}>
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
              {/* <TouchableOpacity
                onPress={() => removeUser(item.userId._id)}
                style={{
                  alignItems: 'flex-end',
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CrossIcon />
              </TouchableOpacity> */}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};
export default AllMemberList;

const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
