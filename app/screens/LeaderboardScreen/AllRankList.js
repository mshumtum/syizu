import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import {getImage} from '../../utils/getImage';
import BackArrow from '../../assets/svg/BackArrow';
import {useState} from 'react';
import {useEffect} from 'react';
import {getId} from '../../utils/localStorage';

function AllRankList({navigation, route}) {
  const [userId, setUserId] = useState('');

  const {list, screen, type} = route.params;
  console.log('LOG=====', list, screen);
  useEffect(() => {
    getId(setUserId);
  }, []);

  let header = screen;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{header}</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={list}
        style={{margin: 10}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              console.log('item=====', item);
              if (type == 1) {
                navigation.navigate('Chatroom', {
                  room_id: item.chatRoomId,
                  roomName: item.chatRoomName,
                  userId: userId,
                });
              }
            }}
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: appColors.white,
              borderRadius: 4,
              marginTop: 2,
            }}>
            {item.image != '' ? (
              <Image source={{uri: item.image}} style={styles.imageStyle} />
            ) : (
              <DummyUserImage height={50} width={50} />
            )}
            <View style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: appColors.black,
                }}>
                {item.chatRoomName}
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
  );
}

export default AllRankList;
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
  headerStyle: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: appColors.white,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    marginLeft: 10,
  },
});
