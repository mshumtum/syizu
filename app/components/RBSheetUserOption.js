import {View, Text, Switch, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {appColors} from '../utils/appColors';
import RBSheet from 'react-native-raw-bottom-sheet';
import MuteIcon from '../assets/svg/MuteIcon';
import LeaveIcon from '../assets/svg/LeaveIcon';
import NextIcon from '../assets/svg/NextIcon';
import FollowUserIcon from '../assets/svg/FollowUserIcon';
import GiftIcon from '../assets/svg/GiftIcon';
import CPConnectionIcon from '../assets/svg/CPConnectionIcon';
import ViewProfileIcon from '../assets/svg/ViewProfileIcon';
import {getImage} from '../utils/getImage';
import BlockIcon from '../assets/svg/BlockIcon';
import DummyUserImage from '../assets/svg/DummyUserImage';
import {getBadge} from '../utils/utils';

const RBSheetUserOption = ({
  userId,
  userData,
  isOpen,
  optionUserData,
  openUserProfile,
  openSheetCP,
  openBreakupCp,
  openGiftList,
  leaveUserAudio,
  toggleSwitchMute,
  isEnabledMute,
  setRBUserOptionOpen,
  isAdmin,
  deleteUserFromChatroom,
  cpInUse,
}) => {
  const refRBSheetUserOption = useRef();

  const [mutePersons, setMutePersons] = useState(0);

  //   const [isRBOpen, setIsOpen] = useState(isOpen);

  useEffect(() => {
    console.log('userId == > ', optionUserData);

    isOpen
      ? refRBSheetUserOption.current.open()
      : refRBSheetUserOption.current.close();

    setMutePersons(optionUserData.isMute);
  }, [isOpen]);

  const muteUser = isEnabledMuteVal => {
    setMutePersons(isEnabledMuteVal ? 1 : 0);
    toggleSwitchMute(isEnabledMuteVal);
    console.log(isEnabledMute);

    // if (isEnabledMuteVal) {
    //   mutePersonList.push(personUserId);
    //   setMutePersonList(mutePersonList);
    // } else {   8283865482
    //   mutePersonList.pop(personUserId);
    //   setMutePersonList(mutePersonList);
    // }
  };

  const getRelation = val => {
    if (val == 'Family') {
      return getImage('homeRel');
    } else {
      if (val == 'Lover') return getImage('loveRel');
      else return getImage('bestieRel');
    }
  };

  const setData = () => {
    // setOptionUserData(null);
    setRBUserOptionOpen(false);
  };

  return (
    <RBSheet
      ref={refRBSheetUserOption}
      closeOnDragDown={true}
      onClose={setData}
      height={400}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
        },
        draggableIcon: {
          backgroundColor: appColors.white,
        },
        container: {
          borderRadius: 10,
          borderColor: appColors.light_grey,
          borderWidth: 1,
          flexWrap: 'wrap',
        },
      }}>
      {optionUserData != null ? (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              alignItems: 'center',
            }}>
            {optionUserData.userId.profileImage != '' ? (
              <Image
                source={{uri: optionUserData.userId.profileImage}}
                style={{height: 50, width: 50, borderRadius: 25}}
              />
            ) : (
              <DummyUserImage />
            )}
            <View style={{margin: 16, flex: 1}}>
              <Text style={{color: appColors.black, fontWeight: '600'}}>
                {optionUserData != null ? optionUserData.userId.userName : ''}
              </Text>
              {/* <Text>Name id code</Text> */}
            </View>
            {/* <Text
              style={{
                color: appColors.white,
                backgroundColor: appColors.primary,
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 2,
                fontSize: 12,
              }}>
              LV {optionUserData.userId.level}
            </Text> */}

            <Image
              style={{width: 30, height: 30, alignSelf: 'center'}}
              source={getBadge(optionUserData?.userId?.level)}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              alignItems: 'center',
              borderColor: appColors.light_grey,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginTop: 8,
              elevation: 1,
              shadowColor: appColors.white,
            }}
            onPress={() => openUserProfile()}>
            <ViewProfileIcon />
            <Text
              style={{
                color: appColors.grey,
                padding: 10,
                flex: 1,
                fontSize: 14,
              }}>
              View Profile
            </Text>
            <NextIcon />
          </TouchableOpacity>
          {optionUserData.userId.cpInUse == 0 ||
          !Object.keys(optionUserData).includes('cpDetails') ? (
            <View>
              {optionUserData.userId.cpInUse == 0 ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    marginTop: 8,
                    alignItems: 'center',
                    borderColor: appColors.light_grey,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    elevation: 1,
                    shadowColor: appColors.white,
                  }}
                  onPress={() =>
                    optionUserData.userId._id != userId ? openSheetCP() : ''
                  }>
                  <CPConnectionIcon />
                  <Text
                    style={{
                      color: appColors.grey,
                      padding: 10,
                      flex: 1,
                      fontSize: 14,
                    }}>
                    {optionUserData.userId._id != userId
                      ? 'Send CP'
                      : 'CP Connection'}
                  </Text>
                  <NextIcon />
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
          ) : (
            <View>
              {Object.keys(optionUserData).includes('cpDetails') ? (
                <TouchableOpacity
                  onPress={() =>
                    userId == optionUserData.cpDetails.createdBy._id ||
                    userId == optionUserData.cpDetails.otherUserId._id
                      ? openBreakupCp()
                      : ''
                  }
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    marginTop: 8,
                    alignItems: 'center',
                    borderColor: appColors.light_grey,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    elevation: 1,
                    shadowColor: appColors.white,
                  }}>
                  <CPConnectionIcon />
                  <Text style={{color: appColors.grey, margin: 10, flex: 1}}>
                    CP Connection
                  </Text>
                  {optionUserData.cpDetails.createdBy._id == userId ? (
                    optionUserData.cpDetails.createdBy.profileImage != '' ? (
                      <Image
                        source={{
                          uri: optionUserData.cpDetails.createdBy.profileImage,
                        }}
                        style={{height: 30, width: 30, borderRadius: 15}}
                      />
                    ) : (
                      <DummyUserImage height={30} width={30} />
                    )
                  ) : optionUserData.cpDetails.otherUserId.profileImage !=
                    '' ? (
                    <Image
                      source={{
                        uri: optionUserData.cpDetails.otherUserId.profileImage,
                      }}
                      style={{height: 30, width: 30, borderRadius: 15}}
                    />
                  ) : (
                    <DummyUserImage height={30} width={30} />
                  )}
                  <Image
                    style={{
                      flex: 1,
                      height: 30,
                      marginRight: -15,
                    }}
                    source={getRelation(optionUserData.cpDetails.cpType)}
                  />
                  {optionUserData.cpDetails.createdBy._id != userId ? (
                    optionUserData.cpDetails.createdBy.profileImage != '' ? (
                      <Image
                        source={{
                          uri: optionUserData.cpDetails.createdBy.profileImage,
                        }}
                        style={{height: 30, width: 30, borderRadius: 15}}
                      />
                    ) : (
                      <DummyUserImage height={30} width={30} />
                    )
                  ) : optionUserData.cpDetails.otherUserId.profileImage !=
                    '' ? (
                    <Image
                      source={{
                        uri: optionUserData.cpDetails.otherUserId.profileImage,
                      }}
                      style={{height: 30, width: 30, borderRadius: 15}}
                    />
                  ) : (
                    <DummyUserImage height={30} width={30} />
                  )}
                </TouchableOpacity>
              ) : (
                ''
              )}
            </View>
          )}
          {optionUserData.userId._id != userId ? (
            <TouchableOpacity
              onPress={() => openGiftList(false)}
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 8,
                borderColor: appColors.light_grey,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                alignItems: 'center',
                elevation: 1,
                shadowColor: appColors.white,
              }}>
              <GiftIcon />
              <Text style={{color: appColors.grey, marginLeft: 10, flex: 1}}>
                Send Gift
              </Text>
              <NextIcon />
            </TouchableOpacity>
          ) : (
            ''
          )}
          {/* {optionUserData.userId._id != userId ? (
            <TouchableOpacity
              onPress={() => followUserApi()}
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 16,
                borderColor: appColors.light_grey,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                alignItems: 'center',
                elevation: 1,
                shadowColor: appColors.white,
              }}>
              <FollowUserIcon />
              <Text style={{color: appColors.grey, marginLeft: 10, flex: 1}}>
                Follow User
              </Text>
              <NextIcon />
            </TouchableOpacity>
          ) : (
            ''
          )} */}
          {(isAdmin == 1 || optionUserData.userId._id == userId) &&
          optionUserData.isAdmin != 1 ? (
            <TouchableOpacity
              onPress={() => leaveUserAudio()}
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 8,
                borderColor: appColors.light_grey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                elevation: 1,
                shadowColor: appColors.white,
              }}>
              <LeaveIcon />
              <Text style={{color: appColors.grey, marginLeft: 10}}>
                Leave Audio
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
          {(isAdmin == 1 || optionUserData.userId._id == userId) &&
          optionUserData.isAudioEnabled == 1 ? (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 8,
                borderColor: appColors.light_grey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                elevation: 1,
                shadowColor: appColors.white,
                alignItems: 'center',
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <MuteIcon />
                <Text style={{color: appColors.grey, marginLeft: 10}}>
                  Mute
                </Text>
              </View>

              <Switch
                style={{alignSelf: 'flex-end'}}
                trackColor={{false: '#767577', true: appColors.primary}}
                thumbColor={isEnabledMute ? appColors.white : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => muteUser(!isEnabledMute)}
                //  mutePersons.includes(optionUserData.userId._id) ? true : false
                value={mutePersons == 1 ? true : false}
              />
            </View>
          ) : (
            ''
          )}

          {isAdmin == 1 && optionUserData.userId._id != userId ? (
            <TouchableOpacity
              onPress={() => deleteUserFromChatroom()}
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 8,
                borderColor: appColors.light_grey,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                elevation: 1,
                shadowColor: appColors.white,
              }}>
              <BlockIcon height={16} width={16} />
              <Text style={{color: appColors.red, marginLeft: 10}}>
                Block User
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      ) : (
        <View />
      )}
    </RBSheet>
  );
};

export default RBSheetUserOption;
