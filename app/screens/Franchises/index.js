import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {getImage} from '../../utils/getImage';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  acceptRejectFranchiseRequest,
  getFranchise,
  joinFranchise,
} from '../../redux/actions/action';
import {getId} from '../../utils/localStorage';
import BackOptionModal from '../../components/BackOptionModal';
import DummyUserImage from '../../assets/svg/DummyUserImage';

const Franchise = ({navigation, route}) => {
  const [franchiseList, setFranchiseList] = useState([]);
  const [added, setAdded] = useState(false);
  const [userId, setUserId] = useState('');
  const [backModalVisible, setBackModalVisible] = useState('');
  const [itemId, setItemId] = useState('');
  const [flag, setFlag] = useState(false);
  // const [status,setStatus] = useState(0)

  // const {userId} = route.params;

  const dispatch = useDispatch();

  const callbackFranchise = val => {
    console.log('Val Franchise ==> ', val[0]);

    for (let i = 0; i < val.length; i++) {
      franchiseList.push(val[i]);
      if (val[i].isAdded > 0) {
        setAdded(true);
      }
      if (i == val.length - 1) {
        const franchises = [...val].sort((a, b) => {
          return a.isAdded < b.isAdded ? 1 : -1;
        });

        console.log('Franchise List ===> ', franchises[0], ' ', franchises[1]);

        setFranchiseList(franchises);
        // setFlag(!flag);
      }
    }

    // setFranchiseList(val);
  };

  const joinFranchiseCallback = val => {
    if (val.status == 1) {
      showToast('Franchise Request Sent.');
      navigation.goBack();
    }
  };

  const joinFranchiseApi = id => {
    const payload = {
      franchiseId: id,
    };

    console.log(payload);

    dispatch(joinFranchise({payload, joinFranchiseCallback}));
  };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const callbackRequest = val => {
    showToast('Request Cancel');
    setAdded(false);
    dispatch(getFranchise({callbackFranchise}));
  };

  const acceptRejectRequest = () => {
    setBackModalVisible(false);
    const payload = {
      franchiseId: itemId,
      userId: userId,
      status: 0,
    };
    console.log(payload);
    dispatch(acceptRejectFranchiseRequest({payload, callbackRequest}));
  };

  const cancelRequest = id => {
    setBackModalVisible(true);
    setItemId(id);
  };

  useEffect(() => {
    getId(setUserId);
    console.log('Franchise');
    dispatch(getFranchise({callbackFranchise}));
  }, []);

  const getColor = isRequested => {
    if (isRequested == 0) {
      return appColors.primary;
    } else if (isRequested == 1) {
      return appColors.yellow;
    } else if (isRequested == 2) {
      return appColors.red;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Franchise</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={franchiseList}
        style={{marginTop: 10, backgroundColor: appColors.white}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FranchiseProfile', {
                userId: item.data._id,
                name: item.data.franchiseId.name,
                fsize: item.data.members.length,
                from: 0,
                image: item.data.userId.profileImage,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: appColors.white,
                marginTop: 2,
              }}>
              {item.data.userId.profileImage != '' ? (
                <Image
                  source={{uri: item.data.userId.profileImage}}
                  style={{
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                    borderRadius: 25,
                  }}
                />
              ) : (
                <DummyUserImage height={50} width={50} />
              )}
              <View style={{flex: 1, marginLeft: 20}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: appColors.black,
                  }}>
                  {item.data.franchiseId.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={getImage('publicImage')}
                    style={{height: 30, width: 30}}
                    resizeMode={'center'}
                  />
                  <Text style={{color: appColors.black}}>
                    {item.data.members.length}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  marginLeft: 4,
                  alignSelf: 'center',
                  paddingVertical: 10,
                }}
                onPress={() =>
                  item.isAdded == 0
                    ? !added
                      ? joinFranchiseApi(item.data._id)
                      : Alert.alert('Syizu', 'You can join only one franchise')
                    : cancelRequest(item.data._id)
                }>
                <Text
                  style={{
                    fontSize: 14,
                    color: appColors.white,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    backgroundColor:
                      item.isAdded == 0
                        ? appColors.primary
                        : item.isAdded == 1
                        ? appColors.light_purple
                        : appColors.red,
                    borderRadius: 5,
                  }}>
                  {item.isAdded == 0
                    ? 'Join'
                    : item.isAdded == 1
                    ? 'In review'
                    : 'Leave'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 2, backgroundColor: appColors.back_color}} />
          </TouchableOpacity>
        )}
      />
      <BackOptionModal
        modalVisible={backModalVisible}
        setExitModalVisible={setBackModalVisible}
        navigation={navigation}
        message="Are you sure you want to cancel request?"
        method={acceptRejectRequest}
      />
    </View>
  );
};

export default Franchise;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
