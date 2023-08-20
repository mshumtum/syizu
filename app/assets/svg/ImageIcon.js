import * as React from 'react';
import {Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getImage} from '../../utils/getImage';
const ImageIcon = props => {
  return <Image source={getImage('ic_more_option')} />;
};
export default ImageIcon;
