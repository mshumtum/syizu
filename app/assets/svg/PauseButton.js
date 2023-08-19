import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PauseButton = props => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14.5833 23.3333C15.3854 23.3333 16.0416 22.6771 16.0416 21.875V13.125C16.0416 12.3229 15.3854 11.6667 14.5833 11.6667C13.7812 11.6667 13.125 12.3229 13.125 13.125V21.875C13.125 22.6771 13.7812 23.3333 14.5833 23.3333ZM17.5 2.91667C9.44996 2.91667 2.91663 9.45 2.91663 17.5C2.91663 25.55 9.44996 32.0833 17.5 32.0833C25.55 32.0833 32.0833 25.55 32.0833 17.5C32.0833 9.45 25.55 2.91667 17.5 2.91667ZM17.5 29.1667C11.0687 29.1667 5.83329 23.9312 5.83329 17.5C5.83329 11.0687 11.0687 5.83333 17.5 5.83333C23.9312 5.83333 29.1666 11.0687 29.1666 17.5C29.1666 23.9312 23.9312 29.1667 17.5 29.1667ZM20.4166 23.3333C21.2187 23.3333 21.875 22.6771 21.875 21.875V13.125C21.875 12.3229 21.2187 11.6667 20.4166 11.6667C19.6145 11.6667 18.9583 12.3229 18.9583 13.125V21.875C18.9583 22.6771 19.6145 23.3333 20.4166 23.3333Z"
      fill="#5F00BA"
    />
  </Svg>
);
export default PauseButton;
