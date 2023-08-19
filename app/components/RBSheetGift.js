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
import {appColors} from '../utils/appColors';
import {getImage} from '../utils/getImage';
import DownArrow from '../assets/svg/DownArror';
import {useState} from 'react';
import {useEffect} from 'react';
import RightArrow from '../assets/svg/RightArrow';

const RBSheetGift = ({
  isOpen,
  setGiftPersonListData,
  sendGift,
  giftList,
  categoriesList,
  giftTo,
  audioPersonList,
  setGiftVisible,
}) => {
  const refRBSheetGift = useRef();
  const [selectCateIndex, setSelectedIndex] = useState(0);

  const setGiftCate = index => {
    setSelectedIndex(index);
    // setGiftList
  };

  const sendMyGift = image => {
    setGiftVisible(false);
    sendGift(image, 2, image);
  };

  useEffect(() => {
    console.log('Gift To ===> ', giftTo);
    isOpen ? refRBSheetGift.current.open() : refRBSheetGift.current.close();
  }, [isOpen]);

  return (
    <RBSheet
      ref={refRBSheetGift}
      closeOnDragDown={true}
      closeOnPressMask={false}
      onClose={() => setGiftVisible(false)}
      height={330}
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
            data={categoriesList}
            style={{marginLeft: 10, marginHorizontal: 20}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{flex: 1, marginHorizontal: 20}}
                onPress={() => setGiftCate(index)}>
                <Text
                  style={{
                    paddingVertical: 8,
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
          data={giftList[selectCateIndex]}
          numColumns={4}
          style={{marginLeft: 10, flex: 1}}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => sendMyGift(item.image)}
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={getImage('coin')}
                    style={{height: 13, width: 13}}
                  />
                  <Text style={{color: appColors.black, fontSize: 10}}>
                    {item.price} coins
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        {audioPersonList != null ? (
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 5,
              backgroundColor: appColors.back_color,
            }}>
            <TouchableOpacity
              onPress={() => setGiftPersonListData(true)}
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                width: 200,
                backgroundColor: appColors.white,
                borderRadius: 8,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={getImage('demoImage')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={{
                  flex: 1,
                  color: appColors.primary,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  backgroundColor: appColors.white,
                }}>
                {giftTo != null
                  ? giftTo.userId.userName
                  : audioPersonList.length > 0
                  ? audioPersonList[0].userId.userName
                  : ''}
              </Text>
              <RightArrow />
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
      </View>
    </RBSheet>
  );
};

export default RBSheetGift;

const styles = StyleSheet.create({});
