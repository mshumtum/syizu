import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CancelButton(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12.5} cy={12.5} r={12.5} fill="#C5213A" />
      <Path
        d="M8.05 8.05a1 1 0 011.414 0L13 11.586l3.536-3.536a1 1 0 011.414 1.414L14.414 13l3.536 3.536a1 1 0 01-1.414 1.414L13 14.414 9.464 17.95a1 1 0 01-1.414-1.414L11.586 13 8.05 9.464a1 1 0 010-1.414z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CancelButton;
