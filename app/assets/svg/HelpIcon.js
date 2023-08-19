import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const HelpIcon = props => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17.5 6.66667C17.9421 6.66667 18.366 6.84226 18.6786 7.15482C18.9911 7.46738 19.1667 7.8913 19.1667 8.33333V11.6667C19.1667 12.1087 18.9911 12.5326 18.6786 12.8452C18.366 13.1577 17.9421 13.3333 17.5 13.3333H16.615C16.4119 14.9444 15.6278 16.426 14.4098 17.5C13.1919 18.574 11.6239 19.1666 10 19.1667V17.5C11.3261 17.5 12.5979 16.9732 13.5356 16.0355C14.4733 15.0979 15 13.8261 15 12.5V7.5C15 6.17392 14.4733 4.90215 13.5356 3.96446C12.5979 3.02678 11.3261 2.5 10 2.5C8.67396 2.5 7.40219 3.02678 6.46451 3.96446C5.52683 4.90215 5.00004 6.17392 5.00004 7.5V13.3333H2.50004C2.05801 13.3333 1.63409 13.1577 1.32153 12.8452C1.00897 12.5326 0.833374 12.1087 0.833374 11.6667V8.33333C0.833374 7.8913 1.00897 7.46738 1.32153 7.15482C1.63409 6.84226 2.05801 6.66667 2.50004 6.66667H3.38504C3.5884 5.05574 4.37261 3.57439 5.59052 2.50056C6.80843 1.42673 8.37634 0.834229 10 0.834229C11.6237 0.834229 13.1917 1.42673 14.4096 2.50056C15.6275 3.57439 16.4117 5.05574 16.615 6.66667H17.5ZM6.46671 13.1542L7.35004 11.7408C8.14427 12.2384 9.06285 12.5015 10 12.5C10.9372 12.5015 11.8558 12.2384 12.65 11.7408L13.5334 13.1542C12.4744 13.8176 11.2497 14.1686 10 14.1667C8.75042 14.1686 7.52566 13.8176 6.46671 13.1542Z"
      fill="black"
    />
  </Svg>
);
export default HelpIcon;