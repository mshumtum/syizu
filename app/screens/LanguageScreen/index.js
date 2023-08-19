import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Linking,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../../assets/svg/Background';

import SyizuLogo from '../../assets/svg/SyizuLogo';
import { appColors } from '../../utils/appColors';
import { getImage } from '../../utils/getImage';
import { getLanguage } from '../../redux/actions/action';

import { setLanguage, useTranslation } from 'react-multi-lang';
import { getId, storeLang } from '../../utils/localStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
};

const LanguageScreen = ({ navigation }) => {
  const { url: initialUrl, processing } = useInitialURL();
  const [checked, setChecked] = useState(0);
  const [userId, setUserId] = useState(null);
  const [room_id, setRoomId] = useState(null);

  const t = useTranslation();

  const langData = useSelector(state => state.getLang);

  const dispatch = useDispatch();

  const [indicator, setIndicator] = useState(true);

  const showNotification = () => {
    console.log('123');

    PushNotification.createChannel(
      {
        channelId: '101', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` functionZ
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: '101', // ID of the notification channel for Android 8.0 and above
      ticker: 'My Notification Ticker', // Ticker text for the notification
      showWhen: true, // Whether to show the notification time
      autoCancel: true, // Whether to automatically cancel the notification when clicked

      /* iOS and Android properties */
      title: 'My Notification Title', // Title of the notification
      message: 'My Notification Message', // Message of the notification
      smallIcon: 'ic_notification', // Name of the small icon for the notification
      largeIcon: 'ic_launcher', // Name of the large icon for the notification
      playSound: true, // Whether to play a sound for the notification
      soundName: 'default', // Sound to play for the notification
      vibrate: true, // Whether to vibrate the device for the notification
      vibration: 300, // Vibration length in milliseconds
      actions: ['Yes', 'No'], // Actions to display with the notification
      // repeatType: 'day', // Type of repetition for recurring notifications
      // repeatTime: 60000, // Time interval for recurring notifications
      date: new Date(Date.now() + 10000), // Schedule a notification 10 seconds from now
    });
  };

  const onConfirm = () => {
    // navigation.navigate('Welcome', {langId: checked + 1});
    getToken();
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('StoreData==>', value);
      if (value !== null) {
        token = value;
        if (room_id == null) {
          navigation.navigate('MyTabs', { screen: 'Home' });
        } else {
          setRoomId(null);
          navigation.navigate('Chatroom', {
            room_id: room_id,
            userId: userId,
            from: 1,
          });
        }
      } else {
        navigation.navigate('Welcome', { langId: checked + 1 });
      }
    } catch (e) {
      console.log('StoreData==>', e);
      // error reading value
    }
  };

  const setLang = index => {
    console.log('index===>', index);
    if (index == 0) {
      console.log('index===>en');
      storeLang('en');
      setLanguage('en');
    } else if (index == 1) {
      storeLang('hi');
      console.log('index===>hi');
      setLanguage('hi');
    } else if (index == 2) {
      storeLang('pa');
      console.log('index===>pa');
      setLanguage('pa');
    } else {
      storeLang('en');
      setLanguage('en');
    }
    setChecked(index);
  };

  useEffect(() => {
    getId(setUserId);
    console.log('LangData===>', langData);
    dispatch(getLanguage());
  }, []);

  useEffect(() => {
    if (initialUrl != null) {
      console.log('Deep Link Lang ===> ', initialUrl);
      getSearchParamFromURL(initialUrl.toString(), 'chatRoomId');
    }
  }, [processing ? processing : '']);

  const getSearchParamFromURL = (url, param) => {
    const include = url.includes(param);

    if (!include) return null;

    const params = url.split(/([&,?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    setRoomId(value);
    console.log('Deep Link Lang ===> ', value);
    return value;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={getImage('background')}
        style={styles.containerStyle}>
        <View style={styles.logoStyle}>
          <SyizuLogo />
        </View>
        {/* {indicator ? (
          <View>
            <SkypeIndicator color={appColors.dark_primary} size={50} />
          </View>
        ) : ( */}
        <FlatList
          data={langData.langData}
          style={{
            margin: 20,
            width: '80%',
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.radioStyle}
              onPress={() => setChecked(index)}>
              <RadioButton.Item
                value="en"
                label={item.languageName}
                position="leading"
                style={{ backgroundColor: appColors.white }}
                status={checked === index ? 'checked' : 'unchecked'}
                color="#5F00BA"
                onPress={() => setLang(index)}
              />
            </TouchableOpacity>
          )}
        />
        {/* )} */}

        {/* <View style={styles.radioStyle}>
          <RadioButton.Item
            value="en"
            label="English"
            position="leading"
            status={checked === 'en' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('en')}
            color="#5F00BA"
          />
        </View>
        <View style={styles.radioStyle}>
          <RadioButton.Item
            value="hi"
            label="Hindi"
            position="leading"
            status={checked === 'hi' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('hi')}
            color="#5F00BA"
          />
        </View>
        <View style={styles.radioStyle}>
          <RadioButton.Item
            value="pa"
            label="Punjabi"
            position="leading"
            status={checked === 'pa' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('pa')}
            color="#5F00BA"
          />
        </View> */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onConfirm()}
        // onPress={() => navigation.navigate('MusicListScreen')}
        >
          <Text style={{ color: appColors.white }}>Confirm</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    height: scale(210),
    width: scale(265),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioStyle: {
    marginTop: 15,
    width: '100%',
    alignItems: 'flex-start',
    padding: 5,
    backgroundColor: appColors.white,
    borderRadius: 10,
    shadowColor: appColors.grey,
    shadowRadius: 10,
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 40,
    alignItems: 'center',
  },
});
