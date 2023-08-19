import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {useDispatch} from 'react-redux';
import {acceptRejectRequest, getAudioRequest} from '../../redux/actions/action';
import {getImage} from '../../utils/getImage';
import {getId} from '../../utils/localStorage';

const AudioRequest = ({navigation}) => {
  const [listData, setListData] = useState([]);

  const [userId, setUserId] = useState('');

  const callBack = val => {
    console.log('ValAudioRequest ===>', val);
    setListData(val.data);
    console.log('ListAudioRequest ===>', listData);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getId(setUserId);

    dispatch(getAudioRequest({callBack}));

    // getToken();
  }, []);

  const callbackRequest = val => {
    console.log('Request ===>', val);

    navigation.navigate('Chatroom', {
      room_id: val.chatRoomId,
      roomName: val.chatRoomName,
      userId: userId,
    });
  };

  const callbackReject = val => {
    console.log('Request ===>', val);
  };

  const acceptRejectRequest1 = (id, status) => {
    console.log('id ==> ', id, ' status==>', status);

    var payload = {
      chatRoomId: id,
      status: status,
    };
    console.log('PayloadAccept ==> ', payload);
    if (status == 1) {
      dispatch(acceptRejectRequest({payload, callbackRequest}));
    } else {
      dispatch(acceptRejectRequest({payload, callbackReject}));
    }
  };

  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>
          Audio<Text style={styles.innerText}>{' Requests'}</Text>
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={listData}
        style={{marginHorizontal: 10, borderRadius: 10}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              marginTop: 2,

              alignItems: 'center',
              padding: 10,
            }}>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text
                style={{
                  color: appColors.black,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {item.chatRoomName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={{marginHorizontal: 15, flex: 1}}
                onPress={() => acceptRejectRequest1(item.chatRoomId, 1)}>
                <Text
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: appColors.green,
                    color: appColors.white,
                    textAlign: 'center',
                    borderRadius: 10,
                  }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 15, flex: 1}}
                onPress={() => acceptRejectRequest(item.chatRoomId, 1)}>
                <Text
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: appColors.red,
                    marginHorizontal: 15,
                    color: appColors.white,
                    flex: 1,
                    textAlign: 'center',
                    borderRadius: 10,
                  }}>
                  Reject
                </Text>
              </TouchableOpacity>
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
  );
};

export default AudioRequest;

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
  innerText: {
    fontSize: 20,
    color: appColors.primary,
    flex: 1,
    fontWeight: 'normal',
  },
});
