import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SendCP from './SendCP';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CPRequests from './CPRequests';

const Tab = createMaterialTopTabNavigator();

function CPTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SendCP"
        component={SendCP}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
      <Tab.Screen
        name="CPRequests"
        component={CPRequests}
        options={({route}) => ({
          tabBarActiveTintColor: appColors.primary,
          tabBarInactiveTintColor: appColors.grey,
          tabBarLabelStyle: {fontWeight: 'bold'},
        })}
      />
    </Tab.Navigator>
  );
}

const CPRequest = ({navigation}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>CP Connection</Text>
      </View>
      <CPTabs />
    </View>
  );
};

export default CPRequest;

const styles = StyleSheet.create({
  containerStyle: {flex: 1, backgroundColor: appColors.white},
  headerStyle: {flexDirection: 'row', padding: 16},
  headerTextStyle: {color: appColors.primary, fontSize: 20, marginLeft: 16},
});
