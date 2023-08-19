import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function AddChatIcon(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_3_24)">
        <Path
          d="M20 5.833a5.834 5.834 0 11-11.667 0 5.834 5.834 0 0111.667 0zM15 2.5a.833.833 0 10-1.667 0V5h-2.5a.833.833 0 000 1.667h2.5v2.5a.833.833 0 101.667 0v-2.5h2.5A.833.833 0 0017.5 5H15V2.5zM5 3.333h2.093a7.47 7.47 0 01.837-1.666H5A3.333 3.333 0 001.667 5v6.667A3.333 3.333 0 005 15v2.5a.833.833 0 001.295.693L11.085 15H15a3.334 3.334 0 003.307-2.912 7.458 7.458 0 01-2.595 1.085 1.66 1.66 0 01-.712.16h-4.167a.834.834 0 00-.461.14l-3.705 2.47v-1.776a.833.833 0 00-.834-.834H5a1.667 1.667 0 01-1.667-1.666V5A1.667 1.667 0 015 3.333z"
          fill="#5F00BA"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3_24">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AddChatIcon;
