import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import SyizuLogo from '../../assets/svg/SyizuLogo';
import { appColors } from '../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getImage } from '../../utils/getImage';

const SplashActivity = ({ navigation }) => {
  useEffect(() => {
    getToken()
  }, []);


  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('StoreData==>', value);
      if (value !== null) {
        navigation.replace('MyTabs', { screen: 'Home' });
      } else {
        navigation.replace('Welcome', { langId: 1 });
      }
    } catch (e) {
      console.log('StoreData==>', e);
      // error reading value
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground

        source={getImage('background')}
        style={styles.container}>
        {/* <Text style={{color: appColors.black}}>Syizu</Text> */}
        <SyizuLogo />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default SplashActivity;
