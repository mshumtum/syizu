import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import CrossIcon from '../../../assets/svg/CrossIcon';
import BackArrow from '../../../assets/svg/BackArrow';
import {getMyChatroom} from '../../../redux/actions/action';
import {useDispatch} from 'react-redux';
import {getId} from '../../../utils/localStorage';
import {SkypeIndicator} from 'react-native-indicators';
import ProgressModal from '../../../components/ProgressModal';

const MyChatrooms = ({navigation}) => {
  const [myChatData, setMyChatData] = useState(null);
  const [userId, setUserId] = useState('');
  const [progressVisible, setProgressVisible] = useState(false);

  const dispatch = useDispatch();
  const callBack = val => {
    console.log('ValMyChatroom==>', val);
    setProgressVisible(false);
    setMyChatData(val);
  };

  useEffect(() => {
    getId(setUserId);
    setProgressVisible(true);
    dispatch(getMyChatroom({callBack}));
    // getToken();
  }, []);

  const getOnlineCount = members => {
    const count = members.filter(obj => obj.socketId !== '').length;
    return count;
  };

  return (
    <View style={{flex: 1}}>
      {myChatData != null && myChatData != [] ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: appColors.white,
              padding: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <Text
              style={{
                color: appColors.primary,
                fontSize: 18,
                alignSelf: 'center',
              }}>
              MY<Text style={{color: appColors.grey}}> Chatrooms</Text>
            </Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={myChatData}
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
                  backgroundColor: appColors.white,
                  marginTop: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                {item.image == '' || item.image == 'abc' ? (
                  <Image
                    style={styles.imageStyle}
                    source={getImage('demoImage')}
                    key={index}
                  />
                ) : (
                  <Image
                    style={styles.imageStyle}
                    source={{uri: item.image}}
                    key={index}
                  />
                )}
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text
                    style={{
                      color: appColors.black,
                      fontSize: 12,
                    }}>
                    {item.chatRoomName}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={getImage('activechat')}
                      style={{marginTop: 5}}
                    />
                    <Text style={{color: appColors.grey, marginLeft: 5}}>
                      {getOnlineCount(item.members)} online
                    </Text>
                  </View>
                </View>
                {/* <View
                  style={{
                    alignItems: 'flex-end',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: appColors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: appColors.white}}>Join</Text>
                </View> */}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default MyChatrooms;

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
