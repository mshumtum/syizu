import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {getImage} from '../../utils/getImage';
import {appColors} from '../../utils/appColors';
import CrossIcon from '../../assets/svg/CrossIcon';
import AcceptButton from '../../assets/svg/AcceptButton';

const CPRequests = () => {
  const [messageList, setMessageList] = useState([
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '1',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '2',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '3',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '4',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '5',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '6',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '7',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '8',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '9',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '10',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '11',
    },
    {
      src: getImage('demoImage'),
      name: 'Chatroom Name',
      lastMessage: 'Last Message',
      count: '20',
      time: '2:00 pm',
      key: '12',
    },
  ]);
  return (
    <View style={styles.containerStyle}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={messageList}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              marginTop: 2,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              style={{
                justifyContent: 'center',
                height: 50,
                width: 50,
              }}
              source={item.src} /* Use item to set the image source */
              key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
            />
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: appColors.black,

                  fontSize: 12,
                }}>
                {item.name}
              </Text>
              <Text style={{color: appColors.grey}}>{item.lastMessage}</Text>
            </View>
            <AcceptButton />
            <View
              style={{
                alignItems: 'flex-end',
                marginHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CrossIcon />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CPRequests;

const styles = StyleSheet.create({
  containerStyle: {flex: 1},
});
