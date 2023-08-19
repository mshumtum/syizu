import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RightArrow from '../../assets/svg/RightArrow';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';

const Setting = ({navigation}) => {
  return (
    <View
      style={{flex: 1, backgroundColor: appColors.white, overflow: 'hidden'}}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Setting</Text>
      </View>
      <TouchableOpacity
        style={styles.optionStyle}
        onPress={() => navigation.navigate('LanguageScreen')}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.normalBold, {marginLeft: 16}]}>
            Change Language
          </Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionStyle}
        onPress={() => navigation.navigate('EditProfile')}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.normalBold, {marginLeft: 16}]}>
            Edit Profile
          </Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <RightArrow />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    marginLeft: 10,
  },
  normalBold: {fontWeight: 'bold', color: appColors.black},
  normalText: {fontWeight: 'normal', color: appColors.grey},
  optionStyle: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: appColors.white,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
