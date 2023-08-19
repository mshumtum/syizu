import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import {getImage} from '../../utils/getImage';
import * as Progress from 'react-native-progress';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getLevel} from '../../redux/actions/action';
import DummyUserImage from '../../assets/svg/DummyUserImage';

const LevelPage = ({navigation}) => {
  const [progressVal, setProgressVal] = useState(0.5);

  const [levelData, setLevelData] = useState(null);

  const dispatch = useDispatch();

  const callbackLevel = val => {
    console.log('Level Data ===> ', val);
    const per = val.data.percentage / 100;
    setProgressVal(per);
    setLevelData(val.data);
  };

  useEffect(() => {
    dispatch(getLevel({callbackLevel}));
  }, []);

  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>My Level</Text>
      </View>
      {levelData != null ? (
        <View
          style={{
            backgroundColor: appColors.light_purple,
            height: 200,
          }}>
          {levelData.profileImage != '' ? (
            <Image
              source={{uri: levelData.profileImage}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignSelf: 'center',
                marginTop: 50,
              }}
            />
          ) : (
            <View style={{alignSelf: 'center', marginTop: 50}}>
              <DummyUserImage />
            </View>
          )}
          <Progress.Bar
            progress={progressVal}
            width={300}
            style={{marginTop: 20, alignSelf: 'center'}}
            unfilledColor={appColors.yellow}
            borderWidth={0}
          />
          <View style={{flexDirection: 'row', marginTop: 4, marginLeft: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start',
                flex: 1,
                marginLeft: 10,
              }}>
              <Text style={{color: appColors.white, fontWeight: '500'}}>
                LV
              </Text>
              <Text style={{color: appColors.white, marginLeft: 4}}>
                {levelData.currentLevel}
              </Text>
              <Text style={{color: appColors.white, marginLeft: 4}}>
                / {levelData.currentWalletPoints}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginEnd: 30,
              }}>
              <Text style={{color: appColors.white, fontWeight: '500'}}>
                LV
              </Text>
              <Text
                style={{
                  color: appColors.white,
                  alignSelf: 'flex-end',
                  marginLeft: 4,
                }}>
                {levelData.nextLevel}
              </Text>
              <Text style={{color: appColors.white, marginLeft: 4}}>
                / {levelData.nextLevelPoints}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        ''
      )}

      <View
        style={{
          flexDirection: 'row',
          marginVertical: 16,
          marginHorizontal: 16,
        }}>
        <Image source={getImage('coin')} />
        <View>
          <Text
            style={{fontSize: 16, fontWeight: '500', color: appColors.black}}>
            {' '}
            For increase your level buy coins{' '}
          </Text>
          <Text style={{color: appColors.grey}}>send gifts, send stickers</Text>
        </View>
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text
          style={{
            fontSize: 20,
            color: appColors.black,
          }}>
          How it's Work
        </Text>
        <Text style={{marginTop: 8, color: appColors.grey}}>
          1. Buy coin from Wallet
        </Text>
        <Text style={{marginTop: 4, color: appColors.grey}}>
          2. You can increase your on buy coins and unlock the new features
        </Text>
        <Text style={{marginTop: 4, color: appColors.grey}}>
          3.Your current level shown on left side and for next level coins are
          shown on right side.
        </Text>
      </View>
    </View>
  );
};

export default LevelPage;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: appColors.white,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    marginLeft: 10,
  },
  textStyle: {
    color: appColors.black,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
  },
});
