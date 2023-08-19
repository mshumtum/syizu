import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import CancelButton from '../../../assets/svg/CancelButton';
import AcceptButton from '../../../assets/svg/AcceptButton';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  acceptRejectChatRequest,
  pendingList,
} from '../../../redux/actions/action';
import {useIsFocused} from '@react-navigation/native';
import {getId} from '../../../utils/localStorage';
import DummyUserImage from '../../../assets/svg/DummyUserImage';
import ProgressModal from '../../../components/ProgressModal';

const MessageRequest = ({navigation}) => {
  const [messageRequest, setMessageRequests] = useState([]);
  const dispatch = useDispatch();

  const [userId, setUserId] = useState('');
  const [progressVisible, setProgressVisible] = useState(false);

  const callBackPendingList = val => {
    console.log('List == > ', val.data);
    console.log(userId);
    setMessageRequests(val.data);
  };

  const callbackRequest = val => {
    console.log('Request Result', val);
    // const id = val._id
    if (Object.keys(val).length > 0) {
      navigation.navigate('ChatScreen', {
        userData: val.createdBy,
        chatId: val._id,
        userId: val.otherUserId._id,
      });
    }
  };

  useEffect(() => {
    getId(setUserId);
    dispatch(pendingList({callBackPendingList}));
  }, []);

  const acceptRejectRequest = (id, status) => {
    const payload = {
      status: status,
      _id: id,
    };
    console.log(payload);
    dispatch(acceptRejectChatRequest({payload, callbackRequest}));
  };

  const rejectRequest = (id, status) => {
    const payload = {
      status: status,
      _id: id,
    };
    console.log(payload);
    dispatch(acceptRejectChatRequest({payload, callbackRequest}));
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    // getId(setUserId);
    if (isFocused) {
      console.log('Refresh===>', isFocused);
      dispatch(pendingList({callBackPendingList}));
    }
    // getToken();
  }, [isFocused]);

  return (
    <View style={styles.containerStyle}>
      {messageRequest.length > 0 ? (
        <FlatList
          data={messageRequest}
          key={'_'}
          numColumns={2}
          style={{margin: 5}}
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: appColors.white,
                marginTop: 2,
                margin: 10,
                padding: 10,
                borderRadius: 10,
                height: 180,
                width: 150,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.createdBy._id != userId ? (
                  item.createdBy.profileImage != '' ? (
                    <Image
                      style={{
                        justifyContent: 'center',
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                      }}
                      source={{
                        uri: item.createdBy.profileImage,
                      }} /* Use item to set the image source */
                      key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                    />
                  ) : (
                    <View style={{justifyContent: 'center'}}>
                      <DummyUserImage />
                    </View>
                  )
                ) : item.otherUserId.profileImage != '' ? (
                  <Image
                    style={{
                      justifyContent: 'center',
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                    }}
                    source={{
                      uri: item.otherUserId.profileImage,
                    }} /* Use item to set the image source */
                    key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                  />
                ) : (
                  <View style={{justifyContent: 'center'}}>
                    <DummyUserImage />
                  </View>
                )}
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                  }}>
                  {item.createdBy._id != userId
                    ? item.createdBy.userName
                    : item.otherUserId.userName}
                </Text>
                <Text style={{color: appColors.grey}}></Text>
                {item.createdBy._id != userId ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: 5}}
                      onPress={() => acceptRejectRequest(item._id, 1)}>
                      <AcceptButton />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() => acceptRejectRequest(item._id, 0)}>
                      <CancelButton />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() => acceptRejectRequest(item._id, 0)}>
                      <CancelButton />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={messageRequest}
          key={'#'}
          horizontal
          style={{margin: 5}}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                backgroundColor: appColors.white,
                marginTop: 2,
                margin: 5,
                padding: 10,
                borderRadius: 10,
                height: 150,
                width: 120,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    justifyContent: 'center',
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                  }}
                  source={{
                    uri: item.createdBy.profileImage,
                  }} /* Use item to set the image source */
                  key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
                />
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                  }}>
                  {item.createdBy.userName}
                </Text>
                <Text style={{color: appColors.grey}}></Text>
                {item.createdBy._id != userId ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: 5}}
                      onPress={() => acceptRejectRequest(item._id, 1)}>
                      <AcceptButton />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() => acceptRejectRequest(item._id, 0)}>
                      <CancelButton />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() => acceptRejectRequest(item._id, 0)}>
                      <CancelButton />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      )}

      <ProgressModal modalVisible={progressVisible} />
    </View>
  );
};

export default MessageRequest;

const styles = StyleSheet.create({
  containerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
