import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appColors } from '../../utils/appColors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  activeBackgroundImage,
  buyBackgroundImage,
  getBackgroundImage,
  getFrame,
  getSticker,
} from '../../redux/actions/action';
import { useState } from 'react';
import DummyUserImage from '../../assets/svg/DummyUserImage';

const ChatroomTheme = () => {
  const dispatch = useDispatch();

  const [backgroundImageList, setBackgroundImageList] = useState([]);

  useEffect(() => {
    console.log('alllllalllll');
    dispatch(getBackgroundImage({ callbackBackgroundImage }));
  }, []);

  const callbackBackgroundImage = val => {
    console.log('callbackBackgroundImage ===> ', val.data);

    setBackgroundImageList(val.data);
    // setFrameList(val.data);
  };

  const buyFrameCallback = value => {
    console.log('Buy Frame Log ===> ', value);
    if (value.res.status == 1) {
      showToast('Buy Successfully');
      activeBackgroundApi(value?.payload.id)
      // dispatch(getBackgroundImage({ callbackBackgroundImage }));
    }
  };

  const buyThemeApi = id => {
    const payload = { id: id };
    dispatch(buyBackgroundImage({ payload, buyFrameCallback }));

  };

  const activeBackgroundApi = id => {
    const payload = { id: id, status: 1 };
    dispatch(activeBackgroundImage({ payload, activeBackgroundCallback }));
  };

  const activeBackgroundCallback = value => {
    console.log('Active Background Log ===> ', value);
    if (value.status == 1) {
      showToast('Active Successfully');
      dispatch(getBackgroundImage({ callbackBackgroundImage }));
    }
  };

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
    <View style={{ flex: 1 }}>
      <FlatList
        data={backgroundImageList}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 20, flex: 1 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 16,
              }}>
              <View
                // onPress={() => sendPing(item.image, 3, item.image)}
                style={{
                  flex: 1,
                  marginTop: 10,
                  alignSelf: 'center',
                }}>
                {item.image != null && item.image != '' ? (
                  <Image
                    resizeMode="contain"
                    source={{ uri: item.image }}
                    style={{
                      padding: 20,
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                    }}
                  />
                ) : (
                  <DummyUserImage />
                )}
              </View>
              <Text style={{ marginTop: 4 }}>
                price{' '}
                <Text
                  style={{
                    color: appColors.black,
                    fontWeight: '500',
                    marginLeft: 8,
                  }}>
                  {item.price}Coins
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  item.isBought == 0
                    ? buyThemeApi(item._id)
                    : item.isActivatedByUser == 0
                      ? activeBackgroundApi(item._id)
                      : showToast('Already Applied');
                }}>
                <Text
                  style={{
                    color: appColors.white,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    backgroundColor:
                      item.isBought == 0
                        ? appColors.primary
                        : item.isActivatedByUser == 0
                          ? appColors.primary
                          : appColors.accept_green,
                    borderRadius: 4,
                    marginTop: 4,
                  }}>
                  {item.isBought == 0
                    ? 'Buy'
                    : item.isActivatedByUser == 0
                      ? 'Active'
                      : 'Applied'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ChatroomTheme;

const styles = StyleSheet.create({});
