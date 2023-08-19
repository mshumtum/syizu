import {
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getImage} from '../../utils/getImage';
import {appColors} from '../../utils/appColors';
import SearchIcon from '../../assets/svg/SearchIcon';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import MessageList from './MessageList/MessageList';
import MessageRequest from './MessageRequest/MessageRequest';
import {useTranslation} from 'react-multi-lang';

import Contacts from 'react-native-contacts';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const t = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('Message')}
        component={MessageList}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
      <Tab.Screen
        name={t('Message Request')}
        component={MessageRequest}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
    </Tab.Navigator>
  );
}

const MessageScreen = () => {
  const t = useTranslation();

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{t('Chatrooms')}</Text>
        {/* <View style={{alignSelf: 'flex-end', marginEnd: 16, marginBottom: 2}}>
          <SearchIcon />
        </View> */}
        {/* <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          // onPress={() => myContacts()}
        >
          <AddChatIcon />
        </TouchableOpacity> */}
      </View>
      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <Image
            source={item.src}
            key={item.key} 
            style={{
              borderWidth: 2,
              marginLeft: 0,
              marginTop: 8,
            }}
          />
        )}
      /> */}
      <MyTabs />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
  },
  flatList: {
    height: 100,
    flexGrow: 0,
  },
});
