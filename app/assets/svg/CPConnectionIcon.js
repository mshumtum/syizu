import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const CPConnectionIcon = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_62_1905)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 3.46957 0 4 0L12 0C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2V3.133L14.941 3.635C15.2609 3.80558 15.5285 4.05992 15.715 4.37081C15.9015 4.6817 16 5.03744 16 5.4V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 1.00039e-08 14.5304 1.00039e-08 14V5.4C-3.62467e-05 5.03744 0.0984807 4.6817 0.285014 4.37081C0.471548 4.05992 0.739081 3.80558 1.059 3.635L2 3.133V2ZM2 4.267L1.53 4.517C1.36987 4.60226 1.23596 4.72948 1.14259 4.88503C1.04923 5.04057 0.99994 5.21859 1 5.4V6.217L2 6.817V4.267ZM3 7.417L6.75 9.667L8 8.917L9.25 9.667L13 7.417V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V7.417ZM14 6.817L15 6.217V5.4C14.9999 5.21876 14.9505 5.04095 14.8572 4.8856C14.7638 4.73025 14.63 4.60318 14.47 4.518L14 4.267V6.817ZM8 2.982C9.664 1.309 13.825 4.236 8 8C2.175 4.236 6.336 1.31 8 2.982ZM15 7.383L10.222 10.25L15 13.117V7.383ZM14.965 14.263L8 10.082L1.035 14.262C1.09252 14.4739 1.21818 14.661 1.39259 14.7943C1.56699 14.9277 1.78044 15 2 15H14C14.2196 15 14.433 14.9277 14.6074 14.7943C14.7818 14.661 14.9075 14.4739 14.965 14.262V14.263ZM1 13.116L5.778 10.249L1 7.383V13.117V13.116Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_62_1905">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CPConnectionIcon;