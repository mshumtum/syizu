import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appColors} from './appColors';

const LoaderModal = visible => {
  return (
    <Modal visible={visible} transparent={true} style={{zIndex: 1100}}>
      <ActivityIndicator size="large" color={appColors.primary} />
    </Modal>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({});
