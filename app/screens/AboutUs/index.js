import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import SyizuLogo from '../../assets/svg/SyizuLogo';

const AboutUs = ({navigation}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>About Us</Text>
      </View>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <SyizuLogo height={150} width={150} />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{color: appColors.black, fontSize: 22, fontWeight: 'bold'}}>
          Address
        </Text>
        <Text
          style={{
            color: appColors.black,
            fontSize: 16,
            marginHorizontal: 54,
            textAlign: 'center',
            marginTop: 8,
          }}>
          Malout Institute of Pharmacy, MALOUT, NEAR JAIN COLONY, ABOHAR ROAD,
          PIND MALOUT, BABA ENTERPRISES, Malaut, Sri Muktsar Sahib, Punjab,
          152107
        </Text>
        <Text
          style={{
            color: appColors.black,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 16,
          }}>
          Email
        </Text>
        <Text
          style={{
            color: appColors.black,
            fontSize: 16,
            marginHorizontal: 54,
            textAlign: 'center',
            marginTop: 8,
          }}>
          care@syizuchat.com
        </Text>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
