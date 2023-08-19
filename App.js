import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LanguageScreen from './app/screens/LanguageScreen';
import Welcome from './app/screens/Welcome';
import OtpScreen from './app/screens/OtpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import MessageScreen from './app/screens/MessageScreen';
import LeaderboardScreen from './app/screens/LeaderboardScreen';
import MyProfileScreen from './app/screens/MyProfileScreen';
import HomeIcon from './app/assets/svg/HomeIcon';
import { appColors } from './app/utils/appColors';
import MessageIcon from './app/assets/svg/MessageIcon';
import LeaderboardIcon from './app/assets/svg/LeaderboardIcon';
import ProfileIcon from './app/assets/svg/ProfileIcon';
import CreateChatroom from './app/screens/CreateChatroom/CreateChatroom';
import TopCpAllRank from './app/screens/LeaderboardScreen/TopCpAllRank/TopCpAllRank';
import WalletScreen from './app/screens/WalletScreen';
import Franchise from './app/screens/Franchises';
import ChatRoom from './app/screens/ChatRoom/ChatRoom';
import PerformanceSupporter from './app/screens/Supporter/PerformanceSupporter';
import FranchiseProfile from './app/screens/FranchiseProfile';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import CreateUser from './app/screens/CreateUser';
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from 'react-multi-lang';
import pa from './app/utils/language/pa.json';
import en from './app/utils/language/en.json';
import hi from './app/utils/language/hi.json';
import MyChatrooms from './app/screens/ChatroomLists/MyChatrooms';
import AllChatrooms from './app/screens/ChatroomLists/AllChatrooms';
import AudioRequest from './app/screens/AudioRequest';
import CPConnectionIcon from './app/assets/svg/CPConnectionIcon';
import CPRequests from './app/screens/CPConnection';
import CPRequest from './app/screens/CPConnection';
import UserProfile from './app/screens/MyProfileScreen/UserProfile';
import ChatScreen from './app/screens/MessageScreen/ChatScreen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';
import { Linking, Platform, View } from 'react-native';
import { useState } from 'react';
import TermAndConditions from './app/screens/TermAndConditions/TermAndConditions';
import PrivacyPolicy from './app/screens/PrivacyPolicy';
import Setting from './app/screens/SettingPage/Setting';
import Help from './app/screens/Help/Help';
import LevelPage from './app/screens/LevelPage/LevelPage';
import EditProfile from './app/screens/EditProfile';
import Search from './app/screens/Search';
import SplashScreen from 'react-native-splash-screen';
import MusicListScreen from './app/screens/MusicListScreen';
import SplashActivity from './app/screens/SplashActivity';
import TrendingChatroom from './app/screens/ChatroomLists/TrendingChatroom';
import TopChatroom from './app/screens/ChatroomLists/TopChatroom';
import MyCCAvanueScreen from './app/screens/CCAvanue/MyCCAvanueScreen';
import { io } from 'socket.io-client';
import AboutUs from './app/screens/AboutUs';
import Store from './app/screens/Store';
import FlashMessage from 'react-native-flash-message';
import AllRankList from './app/screens/LeaderboardScreen/AllRankList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const socket = io('https://chat.virtualittechnology.com/');

setTranslations({ pa, en, hi });
setDefaultLanguage('en');

// useEffect(() => {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   });

//   return unsubscribe;
// }, []);

// const useInitialURL = () => {
//   const [url, setUrl] = useState(null);
//   const [processing, setProcessing] = useState(true);

//   useEffect(() => {
//     const getUrlAsync = async () => {
//       // Get the deep link used to open the app
//       const initialUrl = await Linking.getInitialURL();

//       // The setTimeout is just for testing purpose
//       setTimeout(() => {
//         setUrl(initialUrl);
//         setProcessing(false);
//       }, 1000);
//     };

//     getUrlAsync();
//   }, []);

//   return {url, processing};
// };
// let tokenValue = null
const App = () => {
  // Initialize Firebase
  // firebase.initializeApp({
  // Add your Firebase configuration here
  // });


  useEffect(async () => {
    // Request permission to receive notifications
    messaging().requestPermission();
  }, []);

  useEffect(() => {
    // Handle notifications when app is in foreground
    const unsubscribeForeground = messaging().onMessage(remoteMessage => {
      // console.log('Received foreground message:', remoteMessage);

      showNotification(remoteMessage);
    });

    // Handle notifications when app is in background or closed
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(
      remoteMessage => {
        // console.log('Received background message:', remoteMessage);
        showNotification(remoteMessage);
      },
    );

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  const showNotification = remoteMessage => {
    PushNotification.createChannel({
      channelId: '101', // (required)
      channelName: remoteMessage.data.title, // (required)
    });

    const myJSON = JSON.parse(remoteMessage.data.body);

    console.log('Show ==> ', Platform.Version);

    var title = remoteMessage.data.body.title;
    var text = remoteMessage.data.body.text;

    if (Platform.Version < 29) {
      PushNotification.localNotification({
        /* Android Only Properties */
        autoCancel: true, // Whether to automatically cancel the notification when clicked
        /* iOS and Android properties */
        title: myJSON.title, // Title of the notification
        message: myJSON.text, // Message of the notification
        smallIcon: 'ic_notification', // Name of the small icon for the notification
        largeIcon: 'ic_launcher', // Name of the large icon for the notification
        playSound: true, // Whether to play a sound for the notification
        soundName: 'default', // Sound to play for the notification
        vibrate: true, // Whether to vibrate the device for the notification
        vibration: 300, // Vibration length in milliseconds
      });
    } else {
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: '101', // ID of the notification channel for Android 8.0 and above
        // ticker: remoteMessage.data.title, // Ticker text for the notification
        // showWhen: true, // Whether to show the notification time
        autoCancel: true, // Whether to automatically cancel the notification when clicked

        /* iOS and Android properties */
        title: myJSON.title, // Title of the notification
        message: myJSON.text, // Message of the notification
        smallIcon: 'ic_notification', // Name of the small icon for the notification
        largeIcon: 'ic_launcher', // Name of the large icon for the notification
        playSound: true, // Whether to play a sound for the notification
        soundName: 'default', // Sound to play for the notification
        vibrate: true, // Whether to vibrate the device for the notification
        vibration: 300, // Vibration length in milliseconds
      });
    }

    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('Received notification:', notification);
      },

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('Registered with token:', token);
      },

      // (optional) Called when a remote is received while app is open
      onRemoteNotification: function (notification) {
        console.log('Received remote notification:', notification);
      },

      // (optional) Called when a local notification is received while app is open
      onLocalNotification: function (notification) {
        console.log('Received local notification:', notification);
      },

      // (optional) Called when the user taps on the notification
      onNotificationOpened: function (notification) {
        console.log('Opened notification:', notification);
      },

      // (optional) Called when the user dismisses the notification
      onNotificationDismissed: function (notification) {
        console.log('Dismissed notification:', notification);
      },

      // (optional) Called when the app is backgrounded or closed
      onBackgroundEvent: function (event) {
        console.log('Received background event:', event);
      },

      // (optional) Set the notification icon
      smallIcon: 'ic_notification',

      // (optional) Set the notification sound
      soundName: 'default',

      // (optional) Specify the notification channel for Android 8.0 and above
      channelId: '101',

      // (optional) Set the notification color for Android
      color: '#FF0000',

      // (optional) Set the notification category for Android
      category: 'My category',

      // (optional) Set the visibility of the notification for Android
      visibility: 'private',

      // (optional) Set the priority of the notification for Android
      priority: 'high',

      // (optional) Enable vibration for the notification
      vibration: true,

      // (optional) Specify the vibration pattern for the notification
      vibrationPattern: [500, 200, 500],

      // (optional) Enable or disable showing timestamps for each notification
      showTimestamp: true,

      // (optional) Set the repeat interval for recurring notifications
      repeatType: 'day',

      // (optional) Set the number of times to repeat the notification
      repeatTime: 60000,

      // (optional) Specify the actions that can be taken on the notification
      actions: ['Yes', 'No'],
    });
  };
  // AsyncStorage.getItem('token').then(tokenValue => {



  // console.log("tokenValue=====", tokenValue);
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="SplashActivity" component={SplashActivity} />
            <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
            <Stack.Screen name="CreateChatroom" component={CreateChatroom} />
            <Stack.Screen name="TopCpAllRank" component={TopCpAllRank} />
            <Stack.Screen name="WalletScreen" component={WalletScreen} />
            <Stack.Screen name="Franchise" component={Franchise} />
            <Stack.Screen name="Chatroom" component={ChatRoom} />
            <Stack.Screen name="FranchiseProfile" component={FranchiseProfile} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="MyChatrooms" component={MyChatrooms} />
            <Stack.Screen name="AllChatrooms" component={AllChatrooms} />
            <Stack.Screen name="TrendingChatroom" component={TrendingChatroom} />
            <Stack.Screen name="TopChatroom" component={TopChatroom} />
            <Stack.Screen name="AudioRequest" component={AudioRequest} />
            <Stack.Screen name="CPRequest" component={CPRequest} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="MusicListScreen" component={MusicListScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="LevelPage" component={LevelPage} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="MyCCAvanueScreen" component={MyCCAvanueScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="AllRankList" component={AllRankList} />

            <Stack.Screen
              name="TermAndConditions"
              component={TermAndConditions}
            />
            <Stack.Screen
              name="PerformanceSupporter"
              component={PerformanceSupporter}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </Provider>
    </View>
  );
  // }).catch(err => {
  //   console.log("ERRPR==", err)
  // })
};

function MyTabs() {
  const t = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={t('Home')}
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <HomeIcon
                height={30}
                width={30}
                fill={focused ? appColors.primary : appColors.grey}
              />
            );
          },
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
        })}
      />
      <Tab.Screen
        name={t('Message')}
        component={MessageScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MessageIcon
                height={30}
                width={30}
                fill={focused ? appColors.primary : appColors.grey}
              />
            );
          },
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
        })}
      />
      <Tab.Screen
        name={t('Leaderboard')}
        component={LeaderboardScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <LeaderboardIcon
                height={30}
                width={30}
                fill={focused ? appColors.primary : appColors.grey}
              />
            );
          },
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
        })}
      />
      <Tab.Screen
        name={t('My Profile')}
        component={MyProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <ProfileIcon
                height={30}
                width={30}
                fill={focused ? appColors.primary : appColors.grey}
              />
            );
          },
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
        })}
      />
    </Tab.Navigator>
  );
}

export default App;
