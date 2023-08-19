import {
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appColors } from '../../utils/appColors';
import ButtonEditProfile from '../../assets/svg/ButtonEditProfile';
import { getImage } from '../../utils/getImage';
import CameraWhite from '../../assets/svg/CameraWhite';
import MyWallet from '../../assets/svg/MyWallet';
import RightArrow from '../../assets/svg/RightArrow';
import MyStore from '../../assets/svg/MyStore';
import MyCart from '../../assets/svg/MyCart';
import JoinFran from '../../assets/svg/JoinFran';
import Setting from '../../assets/svg/Setting';
import Term from '../../assets/svg/Term';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { getId } from '../../utils/localStorage';
import {
  getMyProfile,
  getUserDetail,
  logout,
  updateProfile,
  uploadImage,
} from '../../redux/actions/action';
import { useDispatch } from 'react-redux';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import { useIsFocused } from '@react-navigation/native';
import ProgressModal from '../../components/ProgressModal';
import CancelButton from '../../assets/svg/CancelButton';
import { getBadge } from '../../utils/utils';

const MyProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [isProfile, setIsProfile] = useState(false);

  const [filePath, setFilePath] = useState({});
  const [fileCoverPath, setFileCoverPath] = useState({});
  const [userId, setUserId] = useState('');
  const [userDetail, setUserDetail] = useState(null);
  const [progressVisible, setProgressVisible] = useState(false);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    getId(setUserId);
  }, []);

  useEffect(() => {
    // console.log('UserDataFromChatroom ===>', userDetail);
    // setUserId(userData._id);
    if (isFocused) {
      const payload = { userId: userId };
      dispatch(getMyProfile({ callbackUserData }));
    }
  }, [isFocused]);

  const callbackUserData = val => {
    console.log('UserData===>', val.data.profileImage);
    setUserDetail(val);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        showToast('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let isStoragePermitted = await requestExternalWritePermission();
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted && isStoragePermitted) {
      setModalVisible(false);
      const res = await launchCamera();
      console.log('Camera Image ==>', res);
      // setFilePath(res.assets);

      // setProgressVisible(true);

      if (isProfile) {
        setFilePath(res.assets[0]);
        uploadProfileImage(res.assets[0]);
      } else {
        // setProgressVisible(true);
        setFileCoverPath(res.assets[0]);
        uploadProfileImage(res.assets[0]);
      }

      // isProfile ? setFilePath(res.assets[0]) : setFileCoverPath(res.assets[0]);
    }
  };

  const chooseFile = type => {
    setModalVisible(false);
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        showToast('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        showToast('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        showToast(response.errorMessage);
        return;
      }
      // console.log('uri -> ', response.assets[0].uri);

      if (isProfile) {
        setFilePath(response.assets[0]);
        uploadProfileImage(response.assets[0]);
      } else {
        setFileCoverPath(response.assets[0]);
        uploadProfileImage(response.assets[0]);
      }
    });
  };

  const selectImage = from => {
    setIsProfile(from);
    setModalVisible(!modalVisible);
  };

  const onLogout = async () => {
    dispatch(logout({ callbackLogout }));
  };

  const uploadProfileImage = imagePath => {
    const payload = createFormData(imagePath);
    setProgressVisible(true);
    console.log('Payload', payload);

    dispatch(uploadImage({ payload, callbackUpload }));
  };

  const uploadCoverImage = imagePath => {
    const payload = createFormData(imagePath);

    console.log('Payload', payload);

    dispatch(uploadImage({ payload, callbackCoverUpload }));
  };

  const createFormData = imagePath => {
    let match = /\.(\w+)$/.exec(imagePath.fileName);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('myfile', {
      uri: imagePath.uri,
      name: imagePath.fileName,
      type: 'image/*',
    });
    console.log('Form Data', formData);

    return formData;
  };

  const callbackUpload = val => {
    console.log('Upload ==> ', val);

    if (val != null) {
      if (isProfile) {
        const payload = {
          profileImage: val.Location,
        };

        console.log('Payload Image', payload);
        dispatch(updateProfile({ payload, callbackUpdateProfile }));
      } else {
        const payload = {
          coverImage: val.Location,
        };

        console.log('Payload Image', payload);

        dispatch(updateProfile({ payload, callbackUpdateProfile }));
      }
    }
  };

  const callbackCoverUpload = val => {
    console.log('Upload ==> ', val);
    if (val != null) {
      const payload = {
        coverImage: val.Location,
      };

      dispatch(updateProfile({ payload, callbackUpdateProfile }));
    }
  };

  const callbackUpdateProfile = val => {
    console.log(val);
    setProgressVisible(false);
    showToast('Profile Updated Successfully');
    const payload = { userId: userId };
    dispatch(getMyProfile({ callbackUserData }));
  };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const callbackLogout = val => {
    AsyncStorage.clear();

    navigation.navigate('LanguageScreen');
  };

  // const logout = () => {

  // };

  return (
    <View
      style={{ flex: 1, backgroundColor: appColors.white, overflow: 'hidden' }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#fff',

            shadowColor: '#000',
            shadowOffset: { width: 1, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>My Profile</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{ alignSelf: 'flex-end', marginEnd: 8, marginBottom: 2 }}>
              <ButtonEditProfile />
            </TouchableOpacity>
          </View>
          {userDetail == null ? (
            <View style={{ padding: 10 }}>
              {fileCoverPath.uri ? (
                <Image
                  source={{ uri: fileCoverPath.uri }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 15,
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <Image
                  source={getImage('profileCover')}
                  style={{ width: '100%', borderRadius: 15, alignSelf: 'center' }}
                />
              )}

              <TouchableOpacity
                onPress={() => selectImage(false)}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: -40,
                  marginRight: 20,
                }}>
                <CameraWhite />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ padding: 10 }}>
              {userDetail.data.coverImage != null &&
                userDetail.data.coverImage != '' ? (
                <Image
                  source={{ uri: userDetail.data.coverImage }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 15,
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <Image
                  source={getImage('profileCover')}
                  style={{ width: '100%', borderRadius: 15, alignSelf: 'center' }}
                />
              )}

              <TouchableOpacity
                onPress={() => selectImage(false)}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: -40,
                  marginRight: 20,
                }}>
                <CameraWhite />
              </TouchableOpacity>
            </View>
          )}
          {userDetail == null ? (
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
              {filePath.uri ? (
                <Image
                  source={{ uri: filePath.uri }}
                  style={{ height: 70, width: 70, borderRadius: 35 }}
                />
              ) : (
                <DummyUserImage height={70} width={70} />
              )}
            </View>
          ) : (
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
              {userDetail.data.profileImage != null &&
                userDetail.data.profileImage != '' ? (
                <Image
                  source={{ uri: userDetail.data.profileImage }}
                  style={{ height: 70, width: 70, borderRadius: 35 }}
                />
              ) : (
                <DummyUserImage height={70} width={70} />
              )}
            </View>
          )}
          <TouchableOpacity
            onPress={() => selectImage(true)}
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
          </TouchableOpacity>
          <View style={{ marginLeft: 100, flexDirection: 'row' }}>
            <Text style={{ color: appColors.black, fontWeight: 'bold' }}>
              {userDetail != null
                ? userDetail.data.followerUserIds.length > 0
                  ? userDetail.data.followerUserIds.length
                  : 0
                : 0}
            </Text>
            <Text style={{ color: appColors.black, marginLeft: 3 }}>
              {' '}
              Followers
            </Text>
            <View
              style={{
                height: 4,
                width: 8,
                backgroundColor: appColors.primary,
                alignSelf: 'center',
                marginHorizontal: 15,
              }}
            />
            <Text style={{ color: appColors.black, fontWeight: 'bold' }}>
              {userDetail != null
                ? userDetail.data.followingUserIds.length > 0
                  ? userDetail.data.followingUserIds.length
                  : 0
                : 0}
            </Text>
            <Text style={{ color: appColors.black, marginLeft: 3 }}>
              {' '}
              Following
            </Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.normalBold}>
                {userDetail != null ? userDetail.data.userName : ''}
              </Text>
              <Text style={{ color: appColors.grey }}>
                {userDetail != null ? userDetail.data.email : ''}
              </Text>
            </View>
            <Image source={getImage('levelImage')} style={{ marginRight: 20 }} />
            {/* <Text
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
              LV {userDetail != null ? userDetail.data.level : ''}
            </Text> */}
            <Image
              style={{ width: 30, height: 30, alignSelf: 'center', marginTop: 5 }}
              source={getBadge(userDetail?.data?.level)}
            />
          </View>

          <Text
            style={[
              styles.normalBold,
              { marginHorizontal: 20, marginBottom: 20 },
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
        </View>
        <SafeAreaView style={{ margin: 16 }}>
          <Text
            style={[
              styles.headerTextStyle,
              { color: appColors.primary, fontWeight: 'bold' },
            ]}>
            {' '}
            Profile{' '}
            <Text style={{ color: appColors.black, fontWeight: '400' }}>
              {' '}
              Setting
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('WalletScreen')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <MyWallet />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                My Wallet
              </Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <RightArrow />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('Store')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <MyCart />
              <Text style={[styles.normalBold, { marginLeft: 16, marginTop: 4 }]}>
                Store
              </Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <RightArrow />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('LevelPage')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <MyWallet />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                My Level
              </Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <RightArrow />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* <View style={styles.optionStyle}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <MyStore />
              <Text style={[styles.normalBold, {marginLeft: 16}]}>
                My Store
              </Text>
            </View>

            <TouchableOpacity style={{alignSelf: 'center'}}>
              <RightArrow />
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
          // onPress={() => navigation.navigate('Franchise')}
          >
            <View style={styles.optionStyle}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <MyCart />
                <Text style={[styles.normalBold, { marginLeft: 16 }]}>My Cart</Text>
              </View>

              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('Franchise')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <JoinFran />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                Join Franchaise
              </Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <RightArrow />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('Setting')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Setting />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>Setting</Text>
            </View>

            <View style={{ alignSelf: 'center' }}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('AboutUs')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Setting />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                About Us
              </Text>
            </View>

            <View style={{ alignSelf: 'center' }}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('TermAndConditions')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Term />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                Terms & Conditions
              </Text>
            </View>

            <View style={{ alignSelf: 'center' }}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Term />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>
                Privacy Policy
              </Text>
            </View>

            <View style={{ alignSelf: 'center' }}>
              <RightArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionStyle}
            onPress={() => onLogout()}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Term />
              <Text style={[styles.normalBold, { marginLeft: 16 }]}>Logout</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <RightArrow />
            </TouchableOpacity>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
      <ProgressModal modalVisible={progressVisible} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}>
        <View style={{ flex: 1, backgroundColor: appColors.transparent }}>
          <ImageBackground
            style={{
              height: '25%',
              width: '100%',
              marginTop: 'auto',
              alignSelf: 'center',
              justifyContent: 'center',
              borderColor: appColors.back_color,
              borderWidth: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: appColors.white,
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginTop: -20,
                padding: 20,
              }}
              onPress={() => setModalVisible(false)}>
              <CancelButton />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '400',
                color: appColors.primary,
                fontSize: 18,
                marginTop: -16,
                textAlign: 'center',
              }}>
              Select Image
            </Text>
            <TouchableOpacity onPress={() => captureImage()}>
              <Text style={styles.selectImageStyle}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <Text style={[styles.selectImageStyle]}>Gallery</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={[styles.selectImageStyle, {color: appColors.primary}]}>
                Close
              </Text>
            </TouchableOpacity> */}
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
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
  normalBold: { fontWeight: 'bold', color: appColors.black },
  normalText: { fontWeight: 'normal', color: appColors.grey },
  optionStyle: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: appColors.white,
    marginVertical: 10,
  },
  selectImageStyle: {
    color: appColors.black,
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
