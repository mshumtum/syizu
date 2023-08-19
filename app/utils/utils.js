import {ToastAndroid} from 'react-native';
import {getImage} from './getImage';

export const showToast = message => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const hideTextDots = (text, limit) => {
  console.log('dskd==', limit);
  if (limit == undefined) {
    limit = 10;
  }
  let maxlimit = text?.length;
  if (maxlimit > limit) {
    text = text.substring(0, limit) + '...';
  }
  return text;
};

export const getBadge = level => {
  let image = '';
  switch (level) {
    case level <= 15:
      image = getImage('badge_1');
    case level <= 30:
      image = getImage('badge_2');
    case level <= 45:
      image = getImage('badge_3');
    case level <= 60:
      image = getImage('badge_4');
    case level <= 75:
      image = getImage('badge_5');
    case level <= 90:
      image = getImage('badge_6');
    case level <= 105:
      image = getImage('badge_7');
    default:
      image = getImage('badge_1');
  }
  return image;
};
