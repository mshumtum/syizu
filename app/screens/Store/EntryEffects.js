import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appColors } from '../../utils/appColors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  activeEntry,
  buyEntry,
  buyEntryImage,
  getEntry,
  getFrame,
  getSticker,
} from '../../redux/actions/action';
import { useState } from 'react';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import { log } from 'react-native-reanimated';
import buyEntriesSaga from '../../redux/sagas/buyEntriesSaga';
import { showToast } from '../../utils/utils';

const EntryEffects = () => {
  const dispatch = useDispatch();

  const [entryList, setEntriesList] = useState([]);

  useEffect(() => {
    dispatch(getEntry({ callbackEntry }));
  }, []);

  const callbackEntry = val => {
    console.log('Entries ====>', val);
    setEntriesList(val.data);
  };

  const buyEntryApi = id => {
    const payload = { id: id };
    dispatch(buyEntry({ payload, buyEntryCallback }));

  };

  const activeEntriesApi = id => {

    const payload = { id: id, status: 1 };
    dispatch(activeEntry({ payload, activeEntryCallback }));
  };

  const activeEntryCallback = value => {
    console.log('Active Entry Log ===> ', value);
    if (value.status == 1) {
      showToast('Active Successfully');
      dispatch(getEntry({ callbackEntry }));
    }
  };

  const buyEntryCallback = value => {
    console.log('Buy Frame Log ===> ', value);
    if (value.res.status == 1) {
      showToast('Buy Successfully');
      activeEntriesApi(value?.payload?.id)
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={entryList}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        style={{ marginLeft: 10, flex: 1 }}
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
                Price{' '}
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
                    ? buyEntryApi(item._id)
                    : item.isActivatedByUser == 0
                      ? activeEntriesApi(item._id)
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

export default EntryEffects;

const styles = StyleSheet.create({});
