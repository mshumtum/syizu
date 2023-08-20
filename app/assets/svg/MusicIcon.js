import * as React from 'react';
import {Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getImage} from '../../utils/getImage';
const MusicIcon = () => {
  return <Image source={getImage('ic_music')} />;
};
export default MusicIcon;
