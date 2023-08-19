import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImage} from '../../utils/getImage';
import {appColors} from '../../utils/appColors';
import {useDispatch} from 'react-redux';
import {getSupporter} from '../../redux/actions/action';
import {useIsFocused} from '@react-navigation/native';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import ProgressModal from '../../components/ProgressModal';

const TodaySupporters = ({navigation, route}) => {
  const {chatRoomId} = route.params;
  const isFocused = useIsFocused();
  const [supporters, setSupporters] = useState(null);
  const [progressVisible, setProgressVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setProgressVisible(true);
      const payload = {
        roomID: chatRoomId,
        type: 1,
      };

      console.log('Supporter Payload ===> ', payload);

      dispatch(getSupporter({payload, supportCallback}));
    }
  }, [isFocused]);

  const supportCallback = val => {
    console.log('Supporter ===> ', val);
    setProgressVisible(false);
    setSupporters(val.data);
  };

  return (
    <View style={{flex: 1}}>
      {supporters != null ? (
        supporters.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={supporters}
            style={{backgroundColor: appColors.white}}
            renderItem={({item, index}) => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    color: appColors.white,
                    marginTop: 2,
                  }}>
                  {item.profileImage != null && item.profileImage != '' ? (
                    <Image
                      source={{uri: item.profileImage}}
                      style={{
                        height: 50,
                        width: 50,
                        alignSelf: 'center',
                        borderRadius: 25,
                      }}
                    />
                  ) : (
                    <DummyUserImage height={50} width={50} />
                  )}
                  <View
                    style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: appColors.black,
                      }}>
                      {item.userName}
                    </Text>
                  </View>
                  <Image
                    source={getImage('coin')}
                    style={{alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: appColors.black,
                      marginLeft: 4,
                      alignSelf: 'center',
                    }}>
                    {item.coins}
                  </Text>
                </View>
                <View
                  style={{height: 1, backgroundColor: appColors.light_grey}}
                />
              </View>
            )}
          />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{color: appColors.black, alignSelf: 'center'}}>
              Currently no supporter available for today
            </Text>
          </View>
        )
      ) : (
        <ProgressModal modalVisible={progressVisible} />
      )}
    </View>
  );
};

export default TodaySupporters;

const styles = StyleSheet.create({});
