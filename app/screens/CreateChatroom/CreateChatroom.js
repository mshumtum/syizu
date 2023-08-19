import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import {getImage} from '../../utils/getImage';
import {useDispatch} from 'react-redux';
import {
  createChatGroup,
  getTags,
  uploadImage,
} from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {encrypted} from '../../utils/encDecData';
import {getId} from '../../utils/localStorage';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import ProgressModal from '../../components/ProgressModal';
import CancelButton from '../../assets/svg/CancelButton';

const CreateChatroom = ({navigation}) => {
  const chatroom = ' Chatroom';

  const [messageRequest, setMessageRequests] = useState([
    {
      src: getImage('publicImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '1',
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [refreshScreen, setRefreshingScreen] = useState(false);
  const [tags, setTags] = useState(null);
  const [userId, setUserId] = useState('');

  const [progressVisible, setProgressVisible] = useState(false);

  const dispatch = useDispatch();

  const setSelectedTag = name => {
    if (selectedTags.includes(name)) {
      var index = selectedTags.indexOf(name);
      if (index > -1) {
        selectedTags.splice(index, 1);
        setSelectedTags(selectedTags);
        setRefreshingScreen(!refreshScreen);
      }
    } else {
      selectedTags.push(name);
      setSelectedTags(selectedTags);
      setRefreshingScreen(!refreshScreen);
    }
  };

  const tagArray = [];

  const getUserId = () => {
    // if (roomName != '') {
    //   const payload = {
    //     chatRoomName: roomName,
    //     tagIds: selectedTags,
    //     isPrivate: selected,
    //     image: filePath.uri ? filePath.uri : 'abc',
    //   };

    // dispatch(createChatGroup({payload, callBack}));

    const payload = createFormData();
    if (payload == null) {
      showToast('Please select image for chatroom');
      // if (roomName != '') {
      //   const payload = {
      //     chatRoomName: roomName,
      //     tagIds: selectedTags,
      //     isPrivate: selected,
      //     image: '',
      //   };

      //   dispatch(createChatGroup({payload, callBack}));
      // } else {
      //   setProgressVisible(false);
      //   showToast('Please enter chatroom name');
      // }
    } else {
      console.log('Payload', payload);
      if (roomName != '') {
        setProgressVisible(true);

        dispatch(uploadImage({payload, callbackUpload}));
      }
    }

    // } else {
    //   alert('Please enter chatroom name');
    // }
    //   }
    // } catch (e) {
    //   // error reading value
    // }
  };

  const createFormData = () => {
    if (filePath != null) {
      let match = /\.(\w+)$/.exec(filePath.fileName);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('myfile', {
        uri: filePath.uri,
        name: filePath.fileName,
        type: 'image/*',
      });

      console.log('Form Data', formData);

      return formData;
    } else {
      return null;
    }
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

  const callBackTags = val => {
    console.log('Val==>', val);
    setProgressVisible(false);
    setTags(val.data);
    // navigation.navigate('Chatroom', {
    //   room_id: data._id,
    //   roomName: data.chatRoomName,
    // });
    // }
  };

  useEffect(() => {
    getId(setUserId);
    dispatch(getTags({callBackTags}));
  }, []);

  const callBack = (val, data) => {
    console.log('Val==>', data);
    // setProgressVisible(false);
    if (val === true) {
      // alert('Chatroom created');
      setProgressVisible(false);
      console.warn('Chatroom Created');
      navigation.pop();
      navigation.navigate('Chatroom', {
        room_id: data.chatRoomId,
        roomName: data.chatRoomName,
        userId: userId,
      });
    } else {
      setProgressVisible(false);
      showToast('You already created the room.');
    }
  };

  const callbackUpload = val => {
    console.log('Upload ==> ', val);
    if (val != null) {
      if (roomName != '') {
        const payload = {
          chatRoomName: roomName,
          tagIds: selectedTags,
          isPrivate: selected,
          image: val.Location,
        };

        dispatch(createChatGroup({payload, callBack}));
      } else {
        setProgressVisible(false);
        showToast('Please enter chatroom name');
      }
    }
  };

  //for camera & Gallery
  const [filePath, setFilePath] = useState(null);

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
      setFilePath(res.assets[0]);
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
      console.log('base64 -> ', response);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);

      setFilePath(response.assets[0]);
    });
  };

  // const createChatRoom = () => {};

  // const [roomName, setRoomName] = useState('');
  // const [roomName, setRoomName] = useState('');
  // const [roomName, setRoomName] = useState('');
  // const [roomName, setRoomName] = useState('');
  // const [roomName, setRoomName] = useState('');
  // const [roomName, setRoomName] = useState('');

  return (
    <View style={styles.containerStyle}>
      <ScrollView>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>
            Create<Text style={styles.innerText}>{chatroom}</Text>
          </Text>
        </View>
        <View style={styles.firstBlockStyle}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{marginTop: 16}}>
            {filePath != null ? (
              <Image
                source={{uri: filePath.uri}}
                style={{height: 60, width: 60, borderRadius: 30}}
              />
            ) : (
              <DummyUserImage />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Enter Chatroom Name"
            placeholderTextColor={appColors.grey}
            style={{
              color: appColors.black,
              width: '70%',
              backgroundColor: appColors.light_grey,
              textAlign: 'center',
              borderRadius: 30,
              marginTop: 20,
            }}
            onChangeText={val => setRoomName(val)}
          />
          <Text
            style={{
              color: appColors.black,
              fontWeight: 'bold',
              width: '90%',
              marginVertical: 20,
            }}>
            Example:-
            <Text style={{color: appColors.black, fontWeight: 'normal'}}>
              Foody Persons, Travel Lover, Friends Finder, Meet New Friends,
              Punjabi Culture, Dance Diwane, Fun Shun, Etc.
            </Text>
          </Text>
        </View>
        <Text style={[styles.headerTextStyle, {marginLeft: 20}]}>
          Privacy <Text style={styles.innerText}>Setting</Text>
        </Text>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <TouchableOpacity onPress={() => setSelected(0)} style={{flex: 1}}>
            <ImageBackground
              source={selected === 0 ? getImage('privacyBack') : ''}
              style={{
                backgroundColor: appColors.white,
                alignItems: 'center',

                marginHorizontal: 10,
                borderRadius: 16,
                height: 150,
                borderColor: appColors.light_grey,
                borderWidth: 1,
              }}>
              <Image source={getImage('publicImage')} style={{marginTop: 20}} />
              <Text style={{color: appColors.primary}}>Public</Text>
              <Text
                style={{
                  color: appColors.black,
                  textAlign: 'center',
                }}>
                Anyone can see your Chatrooms
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(1)} style={{flex: 1}}>
            <ImageBackground
              source={selected === 1 ? getImage('privacyBack') : ''}
              style={{
                backgroundColor: appColors.white,
                alignItems: 'center',

                marginHorizontal: 10,
                borderRadius: 16,
                height: 150,
                borderColor: appColors.light_grey,
                borderWidth: 1,
              }}>
              <Image
                source={getImage('privateImage')}
                style={{marginTop: 20}}
              />
              <Text style={{color: appColors.primary}}>Private</Text>
              <Text
                style={{
                  color: appColors.black,
                  textAlign: 'center',
                  flexWrap: 'wrap',
                }}>
                Selected person can see your Chatrooms
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTextStyle, {marginLeft: 20, marginTop: 20}]}>
          Select <Text style={styles.innerText}> Tags</Text>
        </Text>
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            data={tags}
            renderItem={({item, index}) => (
              <Text
                style={[
                  styles.tagStyle,
                  {
                    color: selectedTags.includes(item._id)
                      ? appColors.white
                      : appColors.grey,
                    backgroundColor: selectedTags.includes(item._id)
                      ? appColors.primary
                      : appColors.white,
                    marginTop: 10,
                  },
                ]}
                onPress={() => setSelectedTag(item._id)}>
                {item.tagName}
              </Text>
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => getUserId()}>
          <Text style={{color: appColors.white, textAlign: 'center'}}>
            Create Chatroom
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <ProgressModal modalVisible={progressVisible} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}>
        <View
          style={{
            height: '25%',
            width: '100%',
            marginTop: 'auto',
            alignSelf: 'center',
            justifyContent: 'center',
            borderColor: appColors.grey,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: appColors.white,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 20, marginTop: -16}}
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
          <TouchableOpacity onPress={() => captureImage('photo')}>
            <Text style={[styles.selectImageStyle, {fontWeight: '600'}]}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseFile('photo')}>
            <Text style={[styles.selectImageStyle, {fontWeight: '600'}]}>
              Gallery
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={[styles.selectImageStyle, {color: appColors.primary}]}>
              Close
            </Text> */}
          {/* </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

export default CreateChatroom;

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
  innerText: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    fontWeight: 'normal',
  },
  firstBlockStyle: {
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: appColors.white,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowRadius: 5,
    shadowOffset: {width: 10, height: 10},
    borderColor: appColors.light_grey,
    borderWidth: 0.5,
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 30,

    width: '50%',
    alignSelf: 'center',
  },
  tagStyle: {
    borderWidth: 1,
    color: appColors.grey,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flex: 1,
    fontSize: 12,
    marginLeft: 8,
    textAlign: 'center',
    width: 100,
  },
  selectImageStyle: {
    color: appColors.black,
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
});
