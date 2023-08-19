import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SearchIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_7_3404)">
        <Path
          d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.012 1.012 0 00-.115-.1v.001zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
          fill="#5F00BA"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7_3404">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SearchIcon;
