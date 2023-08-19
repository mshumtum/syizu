import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackArrow(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.75 12.5a.781.781 0 01-.781.781H8.917l3.355 3.353a.782.782 0 01-1.106 1.107l-4.688-4.688a.78.78 0 010-1.106l4.688-4.688a.783.783 0 011.106 1.107l-3.355 3.353h9.052a.781.781 0 01.781.781z"
        fill="#5F00BA"
      />
    </Svg>
  );
}

export default BackArrow;
