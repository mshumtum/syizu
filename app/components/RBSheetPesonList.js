import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {appColors} from '../utils/appColors';

const RBSheetPesonList = ({
  isOpen,
  audioPersonList,
  setGiftTo,
  setGiftPersonListData,
}) => {
  const refRBSheetPersonList = useRef();
  useEffect(() => {
    isOpen
      ? refRBSheetPersonList.current.open()
      : refRBSheetPersonList.current.close();
  }, [isOpen]);

  const setPerson = item => {
    setGiftTo(item);
    setGiftPersonListData(false);
  };

  return (
    <RBSheet
      ref={refRBSheetPersonList}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={200}
      customStyles={{
        wrapper: {
          backgroundColor: appColors.transparent,
        },
        draggableIcon: {
          backgroundColor: appColors.white,
        },
        container: {
          borderRadius: 10,
        },
      }}>
      <View style={{flex: 1}}>
        <Text style={{marginLeft: 20, color: appColors.black, fontSize: 16}}>
          Send gift to
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={audioPersonList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setPerson(item)}
              style={{
                flex: 1,
                backgroundColor: appColors.white,
                marginTop: 2,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
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
                {item.userId.userName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </RBSheet>
  );
};

export default RBSheetPesonList;

const styles = StyleSheet.create({});
