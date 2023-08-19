import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import WebView from 'react-native-webview';
import {appColors} from '../../utils/appColors';

const MyCCAvanueScreen = ({navigation, route}) => {
  const {amount} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <TouchableOpacity
        style={{paddingHorizontal: 10, marginTop: 10}}
        onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <WebView
        source={{
          uri: `https://chat.virtualittechnology.com/initatePayment?amount=${amount}`,
        }}
        style={{marginTop: 10, marginHorizontal: 10}}
      />
    </View>
  );
};

export default MyCCAvanueScreen;

const styles = StyleSheet.create({});
