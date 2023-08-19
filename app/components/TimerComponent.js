import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {appColors} from '../utils/appColors';

const TimerComponent = ({minutes, seconds, myWarCoin, otherWarCoin}) => {
  const [second, setSeconds] = useState(seconds);
  const [minute, setMinutes] = useState(minutes);
  const [isActive, setIsActive] = useState(true);
  const [myCoin, setMyCoin] = useState(myWarCoin);
  const [otherCoin, setOtherCoin] = useState(otherWarCoin);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(second => second - 1);
      }, 1000);
    }
    if (isActive && second == 0) {
      // console.log(seconds);
      if (minute == 0) {
        setIsActive(false);
        clearInterval(interval);
      } else {
        setMinutes(minute => minute - 1);
        setSeconds(59);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, second]);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: appColors.white}}>
        Time Left {minute < 10 ? `0${minute}` : minute}:{' '}
        {second < 10 ? `0${second}` : second}
      </Text>
      {/* <Progress.Bar
        progress={0.5}
        width={300}
        style={{marginTop: 10}}
        unfilledColor={appColors.yellow}
        borderWidth={0}
      /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginHorizontal: 35,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image source={getImage('coin')} style={{height: 20, width: 20}} />
          <Text style={{color: appColors.white, marginLeft: 2}}>{myCoin}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: appColors.white,
              marginLeft: 2,
              alignSelf: 'flex-end',
            }}>
            {otherCoin}
          </Text>
          <Image source={getImage('coin')} style={{height: 20, width: 20}} />
        </View>
      </View> */}
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({});
