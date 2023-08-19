import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Term = props => (
  <Svg
    width={18}
    height={20}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M13 0L18 5V19.008C17.9997 19.2712 17.895 19.5235 17.7088 19.7095C17.5226 19.8955 17.2702 20 17.007 20H0.993C0.730378 19.9982 0.479017 19.8931 0.293218 19.7075C0.107418 19.5219 0.00209465 19.2706 0 19.008V0.992C0 0.444 0.445 0 0.993 0H13ZM5.595 10.812L4.603 11.384L5.603 13.116L6.595 12.543C6.988 12.915 7.468 13.197 8 13.355V14.5H10V13.355C10.5255 13.1983 11.0068 12.9201 11.405 12.543L12.397 13.116L13.397 11.384L12.405 10.811C12.5316 10.2777 12.5316 9.72225 12.405 9.189L13.397 8.616L12.397 6.884L11.405 7.457C11.0068 7.07988 10.5255 6.80172 10 6.645V5.5H8V6.645C7.47446 6.80172 6.99316 7.07988 6.595 7.457L5.603 6.884L4.603 8.616L5.595 9.189C5.46821 9.72257 5.46821 10.2784 5.595 10.812ZM9 11.5C8.60218 11.5 8.22064 11.342 7.93934 11.0607C7.65804 10.7794 7.5 10.3978 7.5 10C7.5 9.60218 7.65804 9.22064 7.93934 8.93934C8.22064 8.65804 8.60218 8.5 9 8.5C9.39782 8.5 9.77936 8.65804 10.0607 8.93934C10.342 9.22064 10.5 9.60218 10.5 10C10.5 10.3978 10.342 10.7794 10.0607 11.0607C9.77936 11.342 9.39782 11.5 9 11.5Z"
      fill="#5F00BA"
    />
  </Svg>
);
export default Term;