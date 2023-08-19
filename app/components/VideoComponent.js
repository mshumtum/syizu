import Video from 'react-native-video';
import video from '../test-video.mp4';

const MyComponent = () => {
  const videoPlayer = React.useRef();

  return (
    <Video
      ref={ref => (videoPlayer.current = ref)}
      source={video} // the video file
      paused={false} // make it start
      style={styles.backgroundVideo} // any style you want
      repeat={true} // make it a loop
    />
  );
};
