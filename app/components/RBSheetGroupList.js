import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import WarRoomIcon from '../assets/svg/WarRoomIcon';
import {appColors} from '../utils/appColors';
import {getImage} from '../utils/getImage';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchApi} from '../redux/actions/action';

const RBSheetGroupList = ({
  isOpen,
  chatroomList,
  sendWarRequestApi,
  setIsOpenInviteList,
  setMyChatData,
}) => {
  const refRBSheetGroupList = useRef();

  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('IS OPEN ===> ', isOpen);
    isOpen
      ? refRBSheetGroupList.current.open()
      : refRBSheetGroupList.current.close();
  }, [isOpen]);

  const searchCallback = val => {
    console.log('Search Data ===> ', val);

    setMyChatData(val.chatRoom);
  };

  useEffect(() => {
    const payload = {
      text: searchText,
    };

    dispatch(searchApi({payload, searchCallback}));
  }, [searchText]);

  return (
    <RBSheet
      ref={refRBSheetGroupList}
      closeOnDragDown={true}
      height={500}
      closeOnPressMask={false}
      onClose={() => setIsOpenInviteList(false)}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
        },
        draggableIcon: {
          backgroundColor: appColors.white,
        },
      }}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <WarRoomIcon />
          <Text
            style={{
              color: appColors.black,
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>
            Invites
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Enter chatroom"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setSearchText(val)}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={chatroomList}
          style={{backgroundColor: appColors.white}}
          renderItem={({item, index}) => (
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: appColors.white,
                  marginTop: 2,
                }}>
                <Image
                  source={getImage('demoImage')}
                  style={{height: 40, width: 40}}
                  resizeMode={'center'}
                />
                <View
                  style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: appColors.black,
                      fontSize: 12,
                    }}>
                    {item.chatRoomName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: appColors.black, fontSize: 12}}>
                      {item.smallName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => sendWarRequestApi(item._id, 1)}
                  style={{marginLeft: 6, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: appColors.white,

                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor: appColors.primary,
                      borderRadius: 5,
                    }}>
                    Invite
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{height: 2, backgroundColor: appColors.back_color}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </RBSheet>
  );
};

export default RBSheetGroupList;

const styles = StyleSheet.create({
  inputText: {
    color: appColors.black,
    width: '90%',
    backgroundColor: appColors.light_grey,
    borderRadius: 10,
    padding: 10,
  },
});
