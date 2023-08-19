import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import {useDispatch} from 'react-redux';
import {searchApi} from '../../redux/actions/action';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import DummyUserImage from '../../assets/svg/DummyUserImage';
import {useIsFocused} from '@react-navigation/native';

const Search = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {userId} = route.params;

  const dispatch = useDispatch();

  const [roomList, setRoomList] = useState(null);

  const [searchText, setSearchText] = useState('');

  const searchCallback = val => {
    // console.log('Search Data ===> ', val);

    setRoomList(val.chatRoom);
  };

  useEffect(() => {
    if (isFocused) {
      const payload = {
        text: searchText,
      };

      dispatch(searchApi({payload, searchCallback}));
    }
  }, [searchText]);

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: appColors.white,
          padding: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text
          style={{
            color: appColors.primary,
            fontSize: 18,
            alignSelf: 'center',
          }}>
          Search
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Enter Chatroom"
          placeholderTextColor={appColors.black}
          style={styles.inputText}
          onChangeText={val => setSearchText(val)}
        />
      </View>
      <FlatList
        data={roomList}
        style={{margin: 16}}
        // onScrollToTop={() => loadMoreMessages()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 16}}
            onPress={() =>
              navigation.navigate('Chatroom', {
                room_id: item.chatRoomId,
                roomName: item.chatRoomName,
                userId: userId,
              })
            }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {item.image != '' ? (
                <Image
                  style={{height: 50, width: 50, borderRadius: 30}}
                  source={{uri: item.image}}
                />
              ) : (
                <DummyUserImage height={50} width={50} />
              )}
              <Text style={{marginLeft: 16, color: appColors.black}}>
                {item.chatRoomName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputText: {
    color: appColors.black,
    width: '90%',
    backgroundColor: appColors.light_grey,
    borderRadius: 10,
    padding: 10,
  },
});
