import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {getMyProfile, updateProfile} from '../../redux/actions/action';
import {useEffect} from 'react';
import ProgressModal from '../../components/ProgressModal';
import SyizuLogo from '../../assets/svg/SyizuLogo';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [progressVisible, setProgressVisible] = useState(false);

  const [userDetail, setUserDetail] = useState(null);

  const callbackUpdateProfile = () => {
    setProgressVisible(false);
    showToast('Profile updated');
    navigation.goBack();
  };

  const updateProfileApi = () => {
    setProgressVisible(true);
    const payload = {
      userName: userName,
      bio: bio,
    };

    dispatch(updateProfile({payload, callbackUpdateProfile}));
  };

  const callbackUserData = val => {
    console.log('UserData===>', val.data);
    setUserName(val.data.userName);
    setBio(val.data.bio);
    setUserDetail(val.data);
  };

  useEffect(() => {
    dispatch(getMyProfile({callbackUserData}));
  }, []);

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>
          Edit<Text style={styles.innerText}>{' Profile'}</Text>
        </Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <SyizuLogo />
      </View>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.textStyle}>Username</Text>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            value={userName}
            onChangeText={val => setUserName(val)}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.textStyle}>Bio</Text>
          <TextInput
            placeholder="Enter bio"
            placeholderTextColor={appColors.black}
            multiline={true}
            value={bio}
            style={[styles.inputText, {height: 100}]}
            onChangeText={val => setBio(val)}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => (!progressVisible ? updateProfileApi() : '')}>
          <Text style={{color: appColors.white}}>Update</Text>
        </TouchableOpacity>
      </View>
      <ProgressModal modalVisible={progressVisible} />
    </View>
  );
};

export default EditProfile;

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
    color: appColors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  textStyle: {
    color: appColors.black,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
  },
  inputText: {
    color: appColors.black,
    width: '90%',
    backgroundColor: appColors.light_grey,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    margin: 30,
    alignItems: 'center',
  },
});
