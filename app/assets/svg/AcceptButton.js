import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function AcceptButton(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12.5} cy={12.5} r={12.5} fill="#39D611" />
      <Path
        d="M17.135 8.287c.207-.186.483-.289.77-.287.286.002.56.109.764.298.205.189.323.445.33.715.008.27-.096.532-.29.73l-5.873 6.924a1.105 1.105 0 01-.358.242 1.16 1.16 0 01-1.232-.214l-3.895-3.671a1.043 1.043 0 01-.255-.338.99.99 0 01.227-1.16 1.164 1.164 0 011.23-.215c.136.058.258.14.359.242l3.082 2.904 5.113-6.14a.38.38 0 01.03-.03h-.002z"
        fill="#fff"
      />
    </Svg>
  );
}

export default AcceptButton;
