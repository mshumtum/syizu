import * as React from 'react';
import {Image} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {getImage} from '../../utils/getImage';
const AudioMuteIcon = props => {
  return (
    <Image
      style={{
        width: 35,
        height: 35,
        // position: 'absolute',
        marginLeft: 15,
      }}
      source={getImage('ic_mute')}
    />
  );
};
export default AudioMuteIcon;
