import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const FeaturePlusIcon = props => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.83317 32.0833H23.3332V29.1667H5.83317V11.6667H2.9165V29.1667C2.9165 30.7752 4.22463 32.0833 5.83317 32.0833Z"
      fill="#5F00BA"
    />
    <Path
      d="M29.1667 2.91666H11.6667C10.0581 2.91666 8.75 4.22478 8.75 5.83332V23.3333C8.75 24.9419 10.0581 26.25 11.6667 26.25H29.1667C30.7752 26.25 32.0833 24.9419 32.0833 23.3333V5.83332C32.0833 4.22478 30.7752 2.91666 29.1667 2.91666ZM26.25 16.0417H21.875V20.4167H18.9583V16.0417H14.5833V13.125H18.9583V8.74999H21.875V13.125H26.25V16.0417Z"
      fill="#5F00BA"
    />
  </Svg>
);
export default FeaturePlusIcon;
