import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function ProfileIcon({height, width, fill}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <G opacity={0.8} fill={fill}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0 .833A8.333 8.333 0 0018.333 10a8.333 8.333 0 10-16.666 0A8.333 8.333 0 0010 18.333z"
        />
        <Path d="M5 14.846c0-.43.322-.794.75-.842 3.215-.356 5.3-.324 8.508.008a.829.829 0 01.461 1.447c-3.785 3.3-5.949 3.254-9.452.003A.84.84 0 015 14.846z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.215 14.426c-3.182-.329-5.238-.36-8.42-.008a.429.429 0 00-.245.739c1.737 1.61 3.053 2.338 4.339 2.343 1.29.005 2.677-.718 4.556-2.355a.412.412 0 00-.23-.718zm-8.51-.836c3.248-.36 5.363-.327 8.596.007a1.246 1.246 0 01.692 2.176c-1.906 1.662-3.493 2.567-5.107 2.56-1.618-.006-3.135-.926-4.902-2.566a1.257 1.257 0 01-.4-.921 1.262 1.262 0 011.12-1.257z"
        />
        <Path d="M13.333 8.333a3.334 3.334 0 11-6.667 0 3.334 3.334 0 016.667 0z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0 .834A3.333 3.333 0 1010 5a3.333 3.333 0 000 6.667z"
        />
      </G>
    </Svg>
  );
}

export default ProfileIcon;
