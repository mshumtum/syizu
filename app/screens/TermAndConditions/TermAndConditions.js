import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';

const TermAndConditions = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <TouchableOpacity
        style={{paddingHorizontal: 10, marginTop: 10}}
        onPress={() => navigation.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <WebView
        source={{
          uri: 'https://chat.virtualittechnology.com/terms.html',
        }}
        style={{marginTop: 10, marginHorizontal: 10}}
      />
    </View>
  );
};

export default TermAndConditions;

const styles = StyleSheet.create({});
