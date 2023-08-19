import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {
  acceptRejectFranchiseRequest,
  getFranchiseRequest,
} from '../../../redux/actions/action';
import {useEffect} from 'react';
import {useState} from 'react';
import {getImage} from '../../../utils/getImage';
import {appColors} from '../../../utils/appColors';
import AcceptButton from '../../../assets/svg/AcceptButton';
import CancelButton from '../../../assets/svg/CancelButton';
import {getId} from '../../../utils/localStorage';

import {useIsFocused} from '@react-navigation/native';
import DummyUserImage from '../../../assets/svg/DummyUserImage';

const FranchiseRequest = ({navigation, route}) => {
  const [franchiseRequests, setFranchiseRequests] = useState([]);
  const [userId, setUserId] = useState('');
  const {franchiseId} = route.params;

  const callbackFranchiseRequest = val => {
    console.log('Franchise Request', val.data);
    setFranchiseRequests(val.data);
  };

  const callbackRequest = val => {
    // alert("")
    dispatch(getFranchiseRequest({callbackFranchiseRequest}));
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getId(setUserId);
  //   dispatch(getFranchiseRequest({callbackFranchiseRequest}));
  // }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    // getId(setUserId);
    if (isFocused) {
      console.log('Refresh===>', isFocused);
      dispatch(getFranchiseRequest({callbackFranchiseRequest}));
    }
    // getToken();
  }, [isFocused]);

  const acceptRejectRequest = (id, userId, status) => {
    const payload = {
      franchiseId: franchiseId,
      userId: userId,
      status: status,
    };
    console.log(payload);
    dispatch(acceptRejectFranchiseRequest({payload, callbackRequest}));
  };
  return (
    <View style={styles.containerStyle}>
      {franchiseRequests.length > 3 ? (
        <FlatList
          key={'_'}
          data={franchiseRequests}
          numColumns={3}
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
                  <DummyUserImage height={50} width={50} />
                )}
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                  }}>
                  {item.userId.userName}
                </Text>
                <Text style={{color: appColors.grey}}></Text>
                {item.userId._id != userId ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: 5}}
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 1)
                      }>
                      <AcceptButton />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 0)
                      }>
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
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 0)
                      }>
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
          data={franchiseRequests}
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
                  marginTop: 10,
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
                  <DummyUserImage height={50} width={50} />
                )}
                <Text
                  style={{
                    color: appColors.black,
                    fontSize: 12,
                  }}>
                  {item.userId.userName}
                </Text>
                <Text style={{color: appColors.grey}}></Text>
                {item.userId._id != userId ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{marginRight: 5}}
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 1)
                      }>
                      <AcceptButton />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{marginLeft: 5}}
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 0)
                      }>
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
                      onPress={() =>
                        acceptRejectRequest(item._id, item.userId._id, 0)
                      }>
                      <CancelButton />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FranchiseRequest;

const styles = StyleSheet.create({
  containerStyle: {flex: 1},
});
