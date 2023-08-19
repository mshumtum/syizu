import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {appColors} from '../utils/appColors';
import SyizuLogo from '../assets/svg/SyizuLogo';

//'Syizu!', 'Are you sure you want to go back?'
const ExitOptionModal = ({
  modalVisible,
  setExitModalVisible,
  navigation,
  message,
  from,
  socket,
}) => {
  const onExitPress = () => {
    if (from != null) {
      navigation.navigate('MyTabs', {screen: 'Home'});
    } else {
      navigation.goBack();
    }
  };

  const onCancelClick = () => {
    setExitModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={this.closeModal}>
      <TouchableOpacity
        onPress={() => onCancelClick()}
        style={{
          flex: 1,
          backgroundColor: appColors.transparent,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: appColors.white,
            flexWrap: 'wrap',
            bottom: 0,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          }}>
          {/* <Text
            style={{
              color: appColors.primary,
              fontSize: 18,
              marginHorizontal: 16,
              marginVertical: 16,
              fontWeight: '600',
            }}>
            Syizu
          </Text> */}
          <View style={{alignSelf: 'center', marginTop: 16}}>
            <SyizuLogo height="60" width="120" />
          </View>

          <Text
            style={{
              color: appColors.black,
              marginHorizontal: 16,
              alignSelf: 'center',
            }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              borderTopColor: appColors.light_grey,
              borderBottomColor: appColors.white,
              borderWidth: 1,
            }}>
            <TouchableOpacity style={{flex: 1}} onPress={() => onCancelClick()}>
              <Text
                style={{
                  color: appColors.black,
                  textAlign: 'center',
                  paddingVertical: 10,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderLeftColor: appColors.light_grey,
                borderWidth: 1,
                borderRightColor: appColors.white,
                borderTopColor: appColors.white,
                borderBottomColor: appColors.white,
              }}
              onPress={() => onExitPress()}>
              <Text
                style={{
                  color: appColors.red,
                  fontWeight: '500',
                  textAlign: 'center',
                  paddingVertical: 10,
                }}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ExitOptionModal;

const styles = StyleSheet.create({});
