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
import {useState} from 'react';
import {getImage} from '../../utils/getImage';
import CrossIcon from '../../assets/svg/CrossIcon';
import {appColors} from '../../utils/appColors';
import {useRef} from 'react';
import LoverIcon from '../../assets/svg/LoverIcon';
import FamilyIcon from '../../assets/svg/FamilyIcon';
import BestieIcon from '../../assets/svg/BestieIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import ProfileIcon from '../../assets/svg/ProfileIcon';
import ViewProfileIcon from '../../assets/svg/ViewProfileIcon';
import CPConnectionIcon from '../../assets/svg/CPConnectionIcon';
import GiftIcon from '../../assets/svg/GiftIcon';
import FollowUserIcon from '../../assets/svg/FollowUserIcon';
import NextIcon from '../../assets/svg/NextIcon';

const SendCP = ({navigation}) => {
  const refRBSheetSendCP = useRef();
  const refRBSheetUserOption = useRef();
  const refRBSheetViewProfile = useRef();

  const [cpRelation, setCPRelation] = useState('');

  const [messageList, setMessageList] = useState([
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '1',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '2',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '3',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '4',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '5',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '6',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '7',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '8',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '9',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '10',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '11',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '12',
    },
  ]);

  const openSheetCP = () => {
    refRBSheetUserOption.current.close();
    refRBSheetSendCP.current.open();
  };

  const openViewUser = () => {
    refRBSheetUserOption.current.open();
  };

  const openProfile = () => {
    refRBSheetUserOption.current.close();
    refRBSheetViewProfile.current.open();
  };

  return (
    <View style={styles.containerStyle}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={messageList}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              marginTop: 2,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => openViewUser()}>
            <Image
              style={{
                justifyContent: 'center',
                height: 50,
                width: 50,
              }}
              source={item.src} /* Use item to set the image source */
              key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
            />
            <TouchableOpacity style={{marginLeft: 20}}>
              <Text
                style={{
                  color: appColors.black,

                  fontSize: 12,
                }}>
                {item.name}
              </Text>
              <Text style={{color: appColors.grey}}>{item.lastMessage}</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <CrossIcon /> */}
            </View>
          </TouchableOpacity>
        )}
      />
      <RBSheet
        ref={refRBSheetSendCP}
        closeOnDragDown={true}
        height={400}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            marginHorizontal: 10,
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            borderRadius: 10,
          },
        }}>
        <ImageBackground
          source={getImage('cpBack')}
          style={{flex: 1, alignItems: 'center'}}
          resizeMode="stretch">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Image
              source={getImage('demoImage')}
              style={{height: 60, width: 60}}
            />
            <Image
              source={getImage('demoImage')}
              style={{height: 60, width: 60, marginLeft: -20}}
            />
          </View>
          <Text style={{color: appColors.black}}>Sent CP Card</Text>
          <Text>Send CP request to your chatroom member</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => setCPRelation('Lover')}>
              <LoverIcon />
              <View
                style={{
                  marginTop: -20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={getImage('coin')}
                  style={{height: 20, width: 20, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Lover'
                        ? appColors.primary
                        : appColors.black,
                  }}>
                  1/4 days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => setCPRelation('Family')}>
              <FamilyIcon />
              <View
                style={{
                  marginTop: -20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={getImage('coin')}
                  style={{height: 20, width: 20, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Family'
                        ? appColors.primary
                        : appColors.black,
                  }}>
                  1/4 days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setCPRelation('Bestie')}>
              <BestieIcon />
              <View
                style={{
                  marginTop: -20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={getImage('coin')}
                  style={{height: 20, width: 20, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Bestie'
                        ? appColors.primary
                        : appColors.black,
                  }}>
                  1/4 days
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: appColors.white,
                backgroundColor: appColors.primary,
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 20,
              }}>
              Send Request
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </RBSheet>
      <RBSheet
        ref={refRBSheetUserOption}
        closeOnDragDown={true}
        height={350}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            marginHorizontal: 10,
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            borderRadius: 10,
            borderColor: appColors.light_grey,
            borderWidth: 1,
          },
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              alignItems: 'center',
            }}>
            <Image
              source={getImage('demoImage')}
              style={{height: 50, width: 50}}
            />
            <View style={{margin: 16, flex: 1}}>
              <Text style={{color: appColors.black, fontWeight: '600'}}>
                Username
              </Text>
              <Text>Name id code</Text>
            </View>
            <Text
              style={{
                color: appColors.white,
                backgroundColor: appColors.primary,
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 2,
                fontSize: 12,
              }}>
              LV 24
            </Text>
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
              elevation: 1,
              shadowColor: appColors.white,
            }}
            onPress={() => openProfile()}>
            <ViewProfileIcon />
            <Text style={{color: appColors.grey, margin: 10, flex: 1}}>
              View Profile
            </Text>
            <NextIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              marginTop: 16,
              alignItems: 'center',
              borderColor: appColors.light_grey,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              elevation: 1,
              shadowColor: appColors.white,
            }}
            onPress={() => openSheetCP()}>
            <CPConnectionIcon />
            <Text style={{color: appColors.grey, margin: 10, flex: 1}}>
              Send CP
            </Text>
            <NextIcon />
          </TouchableOpacity>
          <TouchableOpacity
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
            <GiftIcon />
            <Text style={{color: appColors.grey, marginLeft: 10, flex: 1}}>
              Send Gift
            </Text>
            <NextIcon />
          </TouchableOpacity>
          <TouchableOpacity
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
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheetViewProfile}
        closeOnDragDown={true}
        height={350}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            marginHorizontal: 10,
          },
          draggableIcon: {
            backgroundColor: '#fff',
          },
          container: {
            borderRadius: 10,
            borderColor: appColors.light_grey,
            borderWidth: 1,
          },
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#fff',

              shadowColor: '#000',
              shadowOffset: {width: 1, height: 0},
              // shadowOpacity: 0.4,
              // shadowRadius: 3,
              // elevation: 5,
            }}>
            <View style={{marginTop: -30}}>
              <Image
                source={getImage('profileCover')}
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 15,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View
              style={{
                borderRadius: 40,
                marginTop: -50,
                backgroundColor: appColors.white,
                width: 80,
                height: 80,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={getImage('demoImage')}
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: appColors.white,
                  borderRadius: 35,
                }}
              />
            </View>
            <View
              style={{marginLeft: 100, flexDirection: 'row', marginTop: -20}}>
              <Text
                style={{
                  color: appColors.black,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                5.2K
              </Text>
              <Text style={{color: appColors.black, fontSize: 12}}>
                {' '}
                Followers
              </Text>
              <View
                style={{
                  height: 2,
                  width: 8,
                  backgroundColor: appColors.primary,
                  alignSelf: 'center',
                  marginHorizontal: 20,
                }}
              />
              <Text
                style={{
                  color: appColors.black,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                5.2K
              </Text>
              <Text style={{color: appColors.black, fontSize: 12}}>
                {' '}
                Following
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: appColors.black,
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  Official Name
                </Text>
                <Text style={{color: appColors.grey, fontSize: 12}}>
                  Name Id Code
                </Text>
              </View>
              <Image
                source={getImage('levelImage')}
                style={{
                  marginRight: 10,
                  height: 25,
                  width: 25,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  backgroundColor: appColors.primary,
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  color: appColors.white,
                  textAlign: 'center',
                  alignSelf: 'center',

                  borderRadius: 5,
                  fontSize: 12,
                }}>
                LV 24
              </Text>
            </View>

            <Text
              style={[
                styles.normalBold,
                {marginHorizontal: 20, marginBottom: 20},
              ]}>
              Bio:-
              <Text style={styles.normalText}>
                Foody Persons, Travel Lover, Friends Finder, Meet New Friends,
                Punjabi Culture, Dance Diwane, Fun Shun, Etc.
              </Text>
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: appColors.primary,
              paddingHorizontal: 80,
              paddingVertical: 10,
              color: appColors.white,
              alignSelf: 'center',
              borderRadius: 10,
              fontSize: 12,
            }}>
            {' '}
            Follow
          </Text>
        </View>
      </RBSheet>
    </View>
  );
};

export default SendCP;

const styles = StyleSheet.create({
  containerStyle: {flex: 1},
});
