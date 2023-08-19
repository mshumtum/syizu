import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const MyWallet = props => (
  <Svg
    width={24}
    height={22}
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M21.6188 5H3.75C3.33562 5 3 4.66437 3 4.25C3 3.83562 3.33562 3.5 3.75 3.5H21.75C22.1644 3.5 22.5 3.16438 22.5 2.75C22.5 1.50734 21.4927 0.5 20.25 0.5H3C1.34297 0.5 0 1.84297 0 3.5V18.5C0 20.157 1.34297 21.5 3 21.5H21.6188C22.9322 21.5 24 20.4908 24 19.25V7.25C24 6.00922 22.9322 5 21.6188 5ZM19.5 14.75C18.6717 14.75 18 14.0783 18 13.25C18 12.4217 18.6717 11.75 19.5 11.75C20.3283 11.75 21 12.4217 21 13.25C21 14.0783 20.3283 14.75 19.5 14.75Z"
      fill="#5F00BA"
    />
  </Svg>
);
export default MyWallet;
