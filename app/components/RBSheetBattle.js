import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import WarRoomIcon from '../assets/svg/WarRoomIcon';
import {appColors} from '../utils/appColors';
import {getImage} from '../utils/getImage';
import {useEffect} from 'react';
import DummyUserImage from '../assets/svg/DummyUserImage';

const RBSheetBattle = ({
  isOpen,
  sendWarRequestAuto,
  setSelectedTime,
  handleClosePress,
  timeList,
  username,
  selectedTime,
  setIsBattleOpen,
  chatroomData,
}) => {
  const refRBSheetBattle = useRef();

  useEffect(() => {
    console.log('IS OPEN ===> ', isOpen);
    isOpen ? refRBSheetBattle.current.open() : refRBSheetBattle.current.close();
  }, [isOpen]);

  return (
    <RBSheet
      ref={refRBSheetBattle}
      closeOnDragDown={true}
      closeOnPressMask={false}
      onClose={() => setIsBattleOpen(false)}
      height={450}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
        },
        draggableIcon: {
          backgroundColor: appColors.white,
        },
        container: {
          borderRadius: 10,
        },
      }}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <WarRoomIcon />
          <Text
            style={{
              color: appColors.black,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              marginLeft: 20,
            }}>
            War Room
          </Text>
        </View>
        <ImageBackground
          source={getImage('battleBack')}
          style={{
            flexDirection: 'row',
            height: 180,
            width: '100%',
            alignItems: 'center',
            marginTop: -10,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {chatroomData != '' && chatroomData.image != '' ? (
              <Image
                source={{uri: chatroomData.image}}
                style={{
                  height: 60,
                  width: 60,
                  marginLeft: 10,
                  marginBottom: 5,
                  borderRadius: 30,
                }}
              />
            ) : (
              <View style={{marginLeft: 10, marginBottom: 5}}>
                <DummyUserImage />
              </View>
            )}
            <Text
              style={{
                color: appColors.white,
                alignSelf: 'center',
                fontSize: 10,
                marginLeft: 10,
              }}>
              {username}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: appColors.white,
                alignSelf: 'center',
                fontSize: 10,
              }}>
              Rival
            </Text>
            <View
              style={{marginLeft: 10, marginBottom: 5, alignSelf: 'flex-end'}}>
              <DummyUserImage />
            </View>
          </View>
        </ImageBackground>
        <Text
          style={{
            fontSize: 20,
            color: appColors.primary,
            fontWeight: 'bold',
            marginTop: -10,
            marginLeft: 20,
          }}>
          Select
          <Text
            style={{
              color: appColors.black,
              fontWeight: 'normal',
            }}>
            {' '}
            Time
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={timeList}
            renderItem={({item, index}) => (
              <Text
                style={[
                  styles.tagStyle,
                  {
                    color:
                      item.time == selectedTime.trim()
                        ? appColors.white
                        : appColors.grey,
                    backgroundColor:
                      item.time == selectedTime
                        ? appColors.primary
                        : appColors.white,
                  },
                ]}
                onPress={() => setSelectedTime(item.time)}>
                {item.time}
              </Text>
            )}
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            color: appColors.primary,
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 20,
          }}>
          Select
          <Text
            style={{
              color: appColors.black,
              fontWeight: 'normal',
            }}>
            {' '}
            Mode
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => sendWarRequestAuto('', 0)}
            style={{flex: 1}}>
            <Text
              style={{
                color: appColors.white,
                backgroundColor: appColors.primary,
                paddingVertical: 10,
                borderRadius: 10,
                textAlign: 'center',
                marginLeft: 10,
                marginRight: 5,
                fontSize: 12,
              }}>
              Automatic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => handleClosePress()}>
            <Text
              style={{
                color: appColors.primary,
                backgroundColor: appColors.white,
                paddingVertical: 10,
                flex: 1,
                borderRadius: 10,
                textAlign: 'center',
                marginLeft: 5,
                marginRight: 10,
                borderWidth: 2,
                borderColor: appColors.primary,
                fontSize: 12,
              }}>
              Invite
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
};

export default RBSheetBattle;

const styles = StyleSheet.create({
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
    width: 80,
  },
});
