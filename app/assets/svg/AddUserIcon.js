import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {getImage} from '../../utils/getImage';
import {appColors} from '../../utils/appColors';
import {getFont} from '../../utils/getFont';
const AddUserIcon = ({title}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: 55,
          height: 55,
          borderRadius: 50,
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 20,
        }}>
        <Image source={getImage('ic_add')} />
      </View>
      <Text
        style={{
          fontSize: 11,
          color: appColors.white,
          textAlign: 'center',
          height: 14,
          marginTop: 5,
          fontFamily: getFont.Rochester,
        }}>
        {title}
      </Text>
    </View>
  );
};
export default AddUserIcon;
