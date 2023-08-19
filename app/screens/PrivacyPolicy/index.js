import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';

const PrivacyPolicy = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <TouchableOpacity
        style={{paddingHorizontal: 10, marginTop: 10}}
        onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <WebView
        source={{
          uri: 'https://chat.virtualittechnology.com/privacy.html',
        }}
        style={{marginTop: 10, marginHorizontal: 10}}
      />
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
