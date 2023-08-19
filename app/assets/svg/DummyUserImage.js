import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const DummyUserImage = props => (
  <Svg
    width={58}
    height={58}
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={28.9103} cy={28.9103} r={28.9103} fill="#D9D9D9" />
    <Path
      d="M29 28.5C33.8359 28.5 37.75 24.5859 37.75 19.75C37.75 14.9141 33.8359 11 29 11C24.1641 11 20.25 14.9141 20.25 19.75C20.25 24.5859 24.1641 28.5 29 28.5ZM35 31H34.3516C32.7266 31.7812 30.9219 32.25 29 32.25C27.0781 32.25 25.2812 31.7812 23.6484 31H23C18.0312 31 14 35.0312 14 40V42.25C14 44.3203 15.6797 46 17.75 46H40.25C42.3203 46 44 44.3203 44 42.25V40C44 35.0312 39.9688 31 35 31Z"
      fill="#BCBCBC"
    />
  </Svg>
);
export default DummyUserImage;
