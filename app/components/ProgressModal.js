import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {SkypeIndicator} from 'react-native-indicators';
import {appColors} from '../utils/appColors';

const ProgressModal = ({modalVisible}) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={this.closeModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.pop_transparent,
        }}>
        <SkypeIndicator color={appColors.dark_primary} size={50} />
      </View>
    </Modal>
  );
};

export default ProgressModal;

const styles = StyleSheet.create({});
