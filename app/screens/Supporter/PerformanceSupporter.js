import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import {appColors} from '../../utils/appColors';
import SearchIcon from '../../assets/svg/SearchIcon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LastWeekSupporter from './LastWeekSupporter';
import TodaySupporters from './TodaySupporters';
import LifeTimeSupporter from './LifeTimeSupporter';
import {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function MySupportersTabs({chatRoomId}) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Today"
        component={TodaySupporters}
        initialParams={{chatRoomId: chatRoomId}}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
      <Tab.Screen
        name="LastWeek"
        component={LastWeekSupporter}
        initialParams={{chatRoomId: chatRoomId}}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
      <Tab.Screen
        name="LifeTime"
        component={LifeTimeSupporter}
        initialParams={{chatRoomId: chatRoomId}}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
    </Tab.Navigator>
  );
}

const PerformanceSupporter = ({navigation, route}) => {
  const {roomId} = route.params;
  const isFocused = useIsFocused();

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <View style={styles.headerStyle}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 10}}>
          <BackArrow />
        </TouchableOpacity>

        <Text style={styles.headerTextStyle}>
          Performance<Text style={{color: appColors.black}}> Supporter</Text>
        </Text>

        {/* <TouchableOpacity style={{alignSelf: 'flex-end'}}>
          <AddChatIcon />
        </TouchableOpacity> */}
      </View>
      <MySupportersTabs chatRoomId={roomId} />
    </View>
  );
};

export default PerformanceSupporter;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.back_color,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.primary,
    fontWeight: 'bold',
    flex: 1,
  },
});
