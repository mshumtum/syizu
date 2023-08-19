import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const AddButtonAll = props => (
  <Svg
    width={50}
    height={50}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M8.33317 45.8334H33.3332V41.6667H8.33317V16.6667H4.1665V41.6667C4.1665 43.9646 6.03525 45.8334 8.33317 45.8334Z"
      fill="grey"
    />
    <Path
      d="M41.6667 4.16669H16.6667C14.3688 4.16669 12.5 6.03544 12.5 8.33335V33.3334C12.5 35.6313 14.3688 37.5 16.6667 37.5H41.6667C43.9646 37.5 45.8333 35.6313 45.8333 33.3334V8.33335C45.8333 6.03544 43.9646 4.16669 41.6667 4.16669ZM37.5 22.9167H31.25V29.1667H27.0833V22.9167H20.8333V18.75H27.0833V12.5H31.25V18.75H37.5V22.9167Z"
      fill="grey"
    />
  </Svg>
);
export default AddButtonAll;
