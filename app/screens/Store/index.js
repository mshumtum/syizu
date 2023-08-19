import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useTranslation} from 'react-multi-lang';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import Frames from './Frames';
import EntryEffects from './EntryEffects';
import ChatroomTheme from './ChatroomTheme';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const t = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: appColors.primary,
          height: 2,
        },
        tabBarLabelStyle: {fontWeight: 'bold', fontSize: 14},
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.grey,
      }}>
      <Tab.Screen name={'Frames'} component={Frames} />
      <Tab.Screen name={'Entry Effects'} component={EntryEffects} />
      <Tab.Screen
        name={'Chatroom Theme'}
        component={ChatroomTheme}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold', width: 120},
        })}
      />
    </Tab.Navigator>
  );
}

const Store = ({navigation}) => {
  return (
    <View style={styles.containerStyle}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: appColors.white,
          padding: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text
          style={{
            color: appColors.primary,
            fontSize: 22,
            alignSelf: 'center',
            marginLeft: 16,
          }}>
          Store
        </Text>
      </View>
      <MyTabs />
    </View>
  );
};

export default Store;

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
