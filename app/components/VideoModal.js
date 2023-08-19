import { Modal, StyleSheet, Text, ToastAndroid, View, Image } from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import { appColors } from '../utils/appColors';
import { useEffect } from 'react';

const VideoModal = ({ open, setOpenVideo, video, isPlaying, type }) => {
  //  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  useEffect(() => {
    if (type == 1) { //byPass
      setTimeout(() => {
        setOpenVideo(false);
        console.log(video)
      }, 7000)
    }
  }, [])
  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <Modal
      isVisible={open}
      animationType="fade"
      transparent={true}
      animated={true}
      onRequestClose={() => {
        setOpenVideo(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: appColors.pop_transparent,
        }}>
        {
          type == 1 ? <Image
            resizeMode='contain'
            style={{ height: "99%", width: '100%', alignSelf: 'center', bottom: 5 }} source={{ uri: video }} /> :
            <Video
              source={{
                uri: video,
              }}
              paused={!isPlaying}
              controls={false}
              style={{ height: "99%", width: '100%', alignSelf: 'center', bottom: 5 }}
              resizeMode="stretch"
              muted={isMuted}
              onEnd={() => {
                setOpenVideo(false);
              }}
              onError={() => {
                showToast("Error while playing video, Please check internet connection.")
                setOpenVideo(false);
              }}
            />}
      </View>
    </Modal>
  );
};

export default VideoModal;

const styles = StyleSheet.create({});
