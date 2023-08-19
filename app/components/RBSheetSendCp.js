import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getImage} from '../utils/getImage';
import {appColors} from '../utils/appColors';
import LoverIcon from '../assets/svg/LoverIcon';
import FamilyIcon from '../assets/svg/FamilyIcon';
import BestieIcon from '../assets/svg/BestieIcon';
import {useRef} from 'react';
import {useEffect} from 'react';
import DummyUserImage from '../assets/svg/DummyUserImage';

const RBSheetSendCp = ({isOpen, setCPRelation, cpRequest, cpRelation}) => {
  const refRBSheetSendCP = useRef();

  useEffect(() => {
    isOpen ? refRBSheetSendCP.current.open() : refRBSheetSendCP.current.close();
  }, [isOpen]);

  return (
    <View>
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
            <View>
              <DummyUserImage height={60} width={60} />
            </View>

            <View style={{marginLeft: -20}}>
              <DummyUserImage height={60} width={60} />
            </View>
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
                  style={{height: 16, width: 16, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Lover'
                        ? appColors.primary
                        : appColors.black,

                    fontSize: 12,
                  }}>
                  3499/14 days
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
                  style={{height: 16, width: 16, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Family'
                        ? appColors.primary
                        : appColors.black,

                    fontSize: 12,
                  }}>
                  3499/14 days
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
                  style={{height: 16, width: 16, marginRight: 5}}
                />
                <Text
                  style={{
                    color:
                      cpRelation == 'Bestie'
                        ? appColors.primary
                        : appColors.black,
                    fontSize: 12,
                  }}>
                  3499/14 days
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginTop: 20}} onPress={() => cpRequest()}>
            <Text
              style={{
                color: appColors.white,
                backgroundColor: appColors.primary,
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
                fontSize: 14,
                marginTop: 20,
              }}>
              Send Request
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </RBSheet>
    </View>
  );
};

export default RBSheetSendCp;

const styles = StyleSheet.create({});
