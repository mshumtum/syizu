import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {useEffect} from 'react';
import {appColors} from '../utils/appColors';
import {useState} from 'react';

const RBSheetSticker = ({
  isOpen,
  categoriesListSticker,
  stickerList,
  sendPing,
  setStickerVisible,
}) => {
  const refRBSheetSticker = useRef();
  const [selectCateIndex, setSelectedIndex] = useState(0);
  const setStickerCate = index => {
    setSelectedIndex(index);
    // setGiftList
  };

  useEffect(() => {
    // console.log(stickerList);
    isOpen
      ? refRBSheetSticker.current.open()
      : refRBSheetSticker.current.close();
  }, [isOpen]);

  return (
    <RBSheet
      ref={refRBSheetSticker}
      closeOnDragDown={true}
      closeOnPressMask={false}
      onClose={() => setStickerVisible(false)}
      height={300}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
        container: {
          borderRadius: 10,
        },
      }}>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categoriesListSticker}
            style={{marginLeft: 10, marginHorizontal: 20}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{flex: 1, marginHorizontal: 20}}
                onPress={() => setStickerCate(index)}>
                <Text
                  style={{
                    paddingVertical: 4,
                    color:
                      selectCateIndex == index
                        ? appColors.primary
                        : appColors.grey,
                    fontWeight: '600',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: appColors.light_grey,
            marginHorizontal: 20,
            marginTop: 10,
          }}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={stickerList[selectCateIndex]}
          numColumns={4}
          style={{marginLeft: 10, flex: 1}}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => sendPing(item.image, 3, item.image)}
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginTop: 10,
                  alignSelf: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={{uri: item.image}}
                  style={{padding: 20, height: 70, width: 70}}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </RBSheet>
  );
};

export default RBSheetSticker;

const styles = StyleSheet.create({});
