import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/svg/BackArrow';
import {appColors} from '../../utils/appColors';
import SyizuLogo from '../../assets/svg/SyizuLogo';
import {useState} from 'react';
import {helpApi} from '../../redux/actions/action';
import {useDispatch} from 'react-redux';

const Help = ({navigation}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const callbackHelp = val => {
    console.log('HELP ===> ', val);
    if (val.status == 1) {
      showToast('Message sent to team');
      navigation.goBack();
    }
  };

  const send = () => {
    if (subject == '') {
      showToast('please enter subject');
    } else if (message == '') {
      showToast('please enter message');
    } else {
      const payload = {
        subject: subject,
        description: message,
      };

      dispatch(helpApi({payload, callbackHelp}));
    }
  };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        {/* <Text style={styles.headerTextStyle}>Help</Text> */}
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <SyizuLogo height={120} />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={styles.textStyle}>Subject</Text>
        <TextInput
          placeholder="Enter subject"
          placeholderTextColor={appColors.black}
          style={styles.inputText}
          onChangeText={val => setSubject(val)}
        />
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={styles.textStyle}>Message</Text>
        <TextInput
          placeholder="Enter Message"
          placeholderTextColor={appColors.black}
          style={[styles.inputText, {height: 150, textAlignVertical: 'top'}]}
          onChangeText={val => setMessage(val)}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => send()}>
        <Text style={{color: appColors.white}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: appColors.white,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    marginLeft: 10,
  },
  textStyle: {
    color: appColors.black,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
  },
  inputText: {
    color: appColors.black,
    width: '90%',
    backgroundColor: appColors.light_grey,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 50,
    alignItems: 'center',
  },
});
