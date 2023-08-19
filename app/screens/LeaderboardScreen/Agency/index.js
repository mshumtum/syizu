import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {appColors} from '../../../utils/appColors';
import {getImage} from '../../../utils/getImage';
import {useState} from 'react';
import ProgressModal from '../../../components/ProgressModal';
import {useEffect} from 'react';

function Agency() {
  const [chatroomType, setChatroomType] = useState(1);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  });
  const getChatroom = type => {
    setChatroomType(type);
  };
  return (
    <View style={styles.containerStyle}>
      <ImageBackground
        source={getImage('top_agency')}
        style={{
          height: 220,
          flexDirection: 'row',
          justifyContent: 'center',
        }}></ImageBackground>
      <View style={styles.tabBarStyle}>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 1 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(1)}>
          Last Day
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 2 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(2)}>
          Last Week
        </Text>
        <Text
          style={[
            styles.tabTextStyle,
            {color: chatroomType == 3 ? appColors.primary : appColors.grey},
          ]}
          onPress={() => getChatroom(3)}>
          Last Month
        </Text>
      </View>
      <ProgressModal modalVisible={loader} />
    </View>
  );
}
export default Agency;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  tabTextStyle: {color: appColors.grey, fontWeight: 'bold', padding: 20},
  tabBarStyle: {
    marginHorizontal: 30,
    marginTop: -25,
    backgroundColor: appColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  imageStyle: {height: 50, width: 50, borderRadius: 25, alignSelf: 'center'},
});
