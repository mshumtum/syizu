import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LeaderboardIcon({height, width, fill}) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.453 1.602L7.857 4.3l1.876-2.7h-3.28zm4.647 0L12.976 4.3l1.404-2.7H11.1zm-.683.282l-1.92 2.764h3.84l-1.92-2.764zm-4.635.005L3.386 4.65h3.832l-1.436-2.76zm9.27 0l-1.437 2.76h3.833l-2.397-2.76zM3.288 5.352l4.719 6.796h2.124l-2.58-6.796H3.29zm5.048 0l2.08 5.496 2.079-5.496H8.337zm4.944 0l-2.58 6.796h2.124l4.72-6.796h-4.264zm-5.102 7.5v1.796h4.476v-1.796H8.179zm-2.76 2.5l-2.184 3.671H17.6l-2.186-3.671H5.42zm1.091 1.796h7.813v.704H6.51v-.704z"
        fill={fill}
        opacity={0.8}
      />
    </Svg>
  );
}

export default LeaderboardIcon;
