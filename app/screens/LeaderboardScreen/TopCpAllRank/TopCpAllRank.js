import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../../assets/svg/BackArrow';
import {appColors} from '../../../utils/appColors';
import {getImage} from '../../../utils/getImage';

const TopCpAllRank = ({navigation}) => {
  const [cpData, setCpData] = useState([
    {
      count: 1,
      src: getImage('coin'),
      name: 'User Name',
    },
    {
      count: 2,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 3,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 4,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 5,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 6,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 7,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 8,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 9,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 10,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 11,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 12,
      src: getImage('messageImage'),
      name: 'User Name',
    },
    {
      count: 13,
      src: getImage('messageImage'),
      name: 'User Name',
    },
  ]);

  const onBack = () => {
    navigation.navigate('MyTabs', {screen: 'Leaderboard'});
  };

  return (
    <View style={{flex: 1, backgroundColor: appColors.light_grey}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 16,
          backgroundColor: appColors.white,
        }}>
        <TouchableOpacity onPress={onBack}>
          <BackArrow />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: appColors.black,
            fontWeight: 'bold',
            marginLeft: 16,
          }}>
          All Ranks
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={cpData}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 1,
              padding: 10,
              backgroundColor: appColors.white,
            }}>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <Text
                style={{
                  color: appColors.black,
                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  width: 30,
                }}>
                {item.count}.
              </Text>

              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image style={{height: 40, width: 40}} source={item.src} />
                <Text style={{color: appColors.black, fontWeight: 'bold'}}>
                  {' '}
                  {item.name}{' '}
                </Text>
              </View>
              <Image
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginHorizontal: -20,
                  height: 20,
                }}
                source={getImage('homeRel')}
              />
              <View style={{alignItems: 'center'}}>
                <Image style={{height: 40, width: 40}} source={item.src} />
                <Text style={{color: appColors.black, fontWeight: 'bold'}}>
                  {' '}
                  {item.name}{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image source={getImage('coin')} />
              <Text style={{color: appColors.black, fontWeight: 'bold'}}>
                1.3M
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TopCpAllRank;

const styles = StyleSheet.create({});
