import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeIcon({height, width, fill}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19 22H5a1 1 0 01-1-1v-9.643a1.01 1.01 0 01.293-.65l7-7a1 1 0 011.415 0l7 7a.992.992 0 01.292.707V21a1 1 0 01-1 1zm-7.622-4.525c.22.18.433.356.622.525.2-.177.424-.36.662-.554l.057-.047c1.166-.951 2.618-2.134 2.618-3.6A1.799 1.799 0 0013.5 12a2.007 2.007 0 00-1.5.667A2.008 2.008 0 0010.5 12a1.799 1.799 0 00-1.835 1.8c0 1.461 1.44 2.636 2.6 3.58h-.001.005l.018.015h.005l.008.019.052.043.013.01h.006l.007.008z"
        fill={fill}
        opacity={0.8}
      />
    </Svg>
  );
}

export default HomeIcon;
