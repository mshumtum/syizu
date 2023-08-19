import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const UserPlaceholder = props => (
  <Svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx={31.9103}
      cy={31.9103}
      r={30.4103}
      fill="#D9D9D9"
      stroke="white"
      strokeWidth={3}
    />
    <Path
      d="M32 31.5C36.8359 31.5 40.75 27.5859 40.75 22.75C40.75 17.9141 36.8359 14 32 14C27.1641 14 23.25 17.9141 23.25 22.75C23.25 27.5859 27.1641 31.5 32 31.5ZM38 34H37.3516C35.7266 34.7812 33.9219 35.25 32 35.25C30.0781 35.25 28.2812 34.7812 26.6484 34H26C21.0312 34 17 38.0312 17 43V45.25C17 47.3203 18.6797 49 20.75 49H43.25C45.3203 49 47 47.3203 47 45.25V43C47 38.0312 42.9688 34 38 34Z"
      fill="#BCBCBC"
    />
  </Svg>
);
export default UserPlaceholder;
