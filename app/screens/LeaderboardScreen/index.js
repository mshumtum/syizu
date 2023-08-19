import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SearchIcon from '../../assets/svg/SearchIcon';
import AddChatIcon from '../../assets/svg/AddChatIcon';
import {appColors} from '../../utils/appColors';
import TopCP from './TopCP';
import TopGifter from './TopGifter';
import TopChatroom from './TopChatroom';
import TopReceiver from './TopReceiver';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Agency from './Agency';

const TabTop = createMaterialTopTabNavigator();

function LeaderboardTopTabs() {
  return (
    <TabTop.Navigator
      screenOptions={{
        headerShown: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: appColors.primary,
          height: 3,
        },
        tabBarLabelStyle: {fontWeight: 'bold', fontSize: 14},
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.grey,
      }}>
      <TabTop.Screen name="TopCP" component={TopCP} />
      <TabTop.Screen name="TopGifter" component={TopGifter} />
      <TabTop.Screen name="TopChatroom" component={TopChatroom} />
      <TabTop.Screen name="TopReceiver" component={TopReceiver} />
      <TabTop.Screen name="Agency" component={Agency} />
    </TabTop.Navigator>
  );
}

const LeaderboardScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>Leaderboard</Text>
        {/* <View style={{alignSelf: 'flex-end', marginEnd: 16, marginBottom: 2}}>
          <SearchIcon />
        </View> */}
        {/* <View style={{alignSelf: 'flex-end'}}>
          <AddChatIcon />
        </View> */}
      </View>
      <LeaderboardTopTabs />
    </View>
  );
};

export default LeaderboardScreen;

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
});
