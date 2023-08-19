import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import { appColors } from '../../utils/appColors';
import Sound from 'react-native-sound';
import DocumentPicker from 'react-native-document-picker';
import { requestPermission } from 'react-native-contacts';
import RNFS from 'react-native-fs';
import WhiteBackArrow from '../../assets/svg/WhiteBackArrow';
import BackArrow from '../../assets/svg/BackArrow';
import PlayButton from '../../assets/svg/PlayButton';
import PauseButton from '../../assets/svg/PauseButton';
import { getMusicPath, storeMusicPath } from '../../utils/localStorage';
import { check, PERMISSIONS, request } from 'react-native-permissions';

const MusicListScreen = ({ navigation }) => {
  const [fileName, setFileName] = useState('');

  const [isPlaying, setIsPlaying] = useState('');
  const [sound, setSound] = useState(null);

  const [musicFiles, setMusicFiles] = useState([]);

  const requestMediaPermission = async () => {
    try {
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //   {
      //     title: 'Permission',
      //     message: 'Storage access is requiered',
      //     buttonPositive: 'OK',
      //   },
      // );

      // const granted2 = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //   {
      //     title: 'Permission',
      //     message: 'Storage access is requiered',
      //     buttonPositive: 'OK',
      //   },
      // );
      check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)
        .then(res => {
          console.log("REPOSNE+====", res);
          request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)
            .then(res => {
              console.log("PERMISSIONS+====", res);
              try {
                RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Download')
                  .then(result => {
                    const musicFiles = result.filter(
                      file => file.isFile() && file.name.endsWith('.mp3'),
                    );
                    console.log('musicFiles===>', musicFiles);
                    setMusicFiles(musicFiles);
                  })
                  .catch(error => {
                    console.log(error.message);
                  });
              } catch (error) {
                console.log(error);
              }
            }).catch(err => {
              console.log("PERMISSIONS ERROR+====", err);

            })
        }).catch(err => {
          console.log("ERROR+====", err);

        })
      return
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        granted2 === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log(
          'Granted ===> ',
          RNFS.ExternalStorageDirectoryPath + '/download',
        );

        try {
          RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Download')
            .then(result => {
              const musicFiles = result.filter(
                file => file.isFile() && file.name.endsWith('.mp3'),
              );
              console.log('musicFiles===>', musicFiles);
              setMusicFiles(musicFiles);
            })
            .catch(error => {
              console.log(error.message);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Call Again', granted, granted2);
        // requestMediaPe÷rmission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // getMusicPath(setIsPlaying);
    requestMediaPermission();
    // requestStoragePermission();
  }, []);

  async function getFilePath(filePath) {
    console.log(filePath);

    const statResult = await RNFS.stat(filePath);
    return statResult.originalFilepath;
  }

  const playMusicSound = path => {
    if (isPlaying != path) {
      if (sound != null) {
        console.log('pause');
        sound.stop(() => {
          // sound.play();
        });
        setIsPlaying('');
        storeMusicPath('');
      }
    }

    getFilePath(path).then(actualFilePath => {
      console.log('filePath ===> ', actualFilePath);

      const soundObj = new Sound(actualFilePath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log(
          'duration in seconds: ' +
          soundObj.getDuration() +
          ' number of channels: ' +
          soundObj.getNumberOfChannels(),
        );
        setSound(soundObj);
        console.log('isPlaying ===> ', isPlaying);
        //
        //   console.log('pause');
        //   sound.stop(() => {
        //     sound.play();
        //   });
        //   setIsPlaying('');
        // } else {
        if (isPlaying != path) {
          console.log('Play');
          soundObj.play();
          setIsPlaying(path);
          storeMusicPath(path);
        }
        //   }
      });
    });
  };

  const handlePlay = path => {
    console.log('pause');
    sound.stop(() => {
      // sound.play();
    });
    setIsPlaying('');
    storeMusicPath('');
    setSound(null);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: appColors.white,
        }}>
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Music</Text>
      </View>
      <FlatList
        data={musicFiles}
        renderItem={({ item, index }) => (
          <View
            style={styles.itemBack}
          // onPress={() => playMusicSound(item.path)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            {item.path != isPlaying ? (
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => playMusicSound(item.path)}>
                <PlayButton />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => handlePlay(item.path)}>
                <PauseButton />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MusicListScreen;

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 20,
    color: appColors.primary,
    flex: 1,
  },
  itemBack: {
    backgroundColor: appColors.white,
    marginTop: 5,
    flexDirection: 'row',
  },
  itemText: {
    color: appColors.black,
    fontSize: 14,
    padding: 16,
    width: '85%',
  },
});
