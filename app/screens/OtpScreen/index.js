import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImage} from '../../utils/getImage';
import SyizuLogo from '../../assets/svg/SyizuLogo';
import {appColors} from '../../utils/appColors';
import {getFont} from '../../utils/getFont';
import {CallingCodePicker} from '@digieggs/rn-country-code-picker';
import OtpInputs from 'react-native-otp-inputs';
import {getOtp, verifyOtp} from '../../redux/actions/action';
import {useDispatch, useSelector} from 'react-redux';
import {encrypted} from '../../utils/encDecData';
import {useTranslation} from 'react-multi-lang';
import messaging from '@react-native-firebase/messaging';

const OtpScreen = ({navigation, route}) => {
  const t = useTranslation();
  // const {phnNo, confirm, langId} = route.params;
  const {phnNo, otp, id, langId, confirm} = route.params;

  const [fcmToken, setFcmToken] = useState('');

  const [phnNoState, setPhnNo] = useState(phnNo);
  const otpData = useSelector(state => state.getOtp);

  const dispatch = useDispatch();

  const [myOtp, setOTP] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);

  const setOtpValue = val => {
    const ot = val.toString();
    console.log('OTP===>', ot);
    ot.length > 5 ? setOTP(ot) : '';
  };

  const callBackOtp = (val, isAlreadyExist) => {
    // confirmCode(myOtp, val, isAlreadyExist);

    console.log('Val==>', val);
    if (val === true) {
      if (isAlreadyExist == 0) {
        navigation.pop();
        navigation.navigate('CreateUser');
      } else {
        navigation.pop();
        navigation.navigate('MyTabs', {screen: 'Home'});
      }
    }
  };

  const callBack = (val, otp, id) => {
    console.log('Val==>', val, ' OTP===>', otp);
    if (val === true) {
      showToast('OTP sent');
      // alert(otp);
      setSeconds(30);
      setIsActive(true);
      //  console.log('UseSelector', otpData);
      //  navigation.navigate('OtpScreen', {
      //    phnNo: phnNo,
      //    otp: otp,
      //    id: id,
      //    langId,
      //  });
    }
  };

  async function confirmCode(code, val, isAlreadyExist) {
    try {
      const response = await confirm.confirm(code);
      if (response.user.uid != null) {
        if (val === true) {
          if (isAlreadyExist == 0) {
            navigation.pop();
            navigation.navigate('CreateUser');
          } else {
            navigation.pop();
            navigation.navigate('MyTabs', {screen: 'Home'});
          }
        }
      }
      console.log('Response OTP ==>', response);
    } catch (error) {
      showToast('Invalid code.');
      console.log('Invalid code.');
    }
  }

  const onSend = val => {
    console.log(myOtp.length);
    if (val > 99999) {
      const payload = {
        otp: myOtp,
        userId: id,
        fcmToken: fcmToken,
      };
      // const payload = encrypted(request);
      console.log(payload);

      dispatch(verifyOtp({payload, callBackOtp}));
    } else {
      console.log('Else==>', myOtp, '  ', otp);
    }
  };

  const [inputEditable, setInputEditable] = useState(false);

  useEffect(async () => {
    var cmToken = await messaging().getToken();
    setFcmToken(cmToken);
    console.log('FCM Token ==> ', fcmToken);
    // alert(otp);
    console.log(otp);
  }, [otp]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    if (isActive && seconds == 0) {
      // console.log(seconds);
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const navigateBack = () => {
    navigation.pop();
    navigation.navigate('Welcome', {langId});
  };

  const resendOtp = () => {
    const payload = {
      mobileNumber: phnNo,
      languageCode: langId,
    };
    // const payload = encrypted(request);

    dispatch(getOtp({payload, callBack}));
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
    <View style={{flex: 1}}>
      <ImageBackground
        source={getImage('background')}
        style={styles.containerStyle}>
        <SyizuLogo />
        <View style={{flexDirection: 'row', marginTop: 20, width: '74%'}}>
          <Text style={styles.comeStyle}>
            Note:-
            <Text style={{color: appColors.text_grey}}>
              Please enter six digit OTP which we sent on your entered mobile
              number
            </Text>
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'flex-start',
            marginLeft: 40,
            color: appColors.black,
            marginTop: 20,
          }}>
          Mobile Number
        </Text>
        <View flexDirection="row" style={styles.countryCodeStyle}>
          <Image
            source={getImage('flag')}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 10,
            }}
          />
          <Text
            style={{
              marginLeft: 4,
              color: appColors.black,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            +91
          </Text>

          <View
            style={{
              width: 1,
              alignSelf: 'center',
              height: '90%',
              marginHorizontal: 8,
              backgroundColor: appColors.dark_grey,
            }}>
            <Text></Text>
          </View>

          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={phnNoState}
            editable={inputEditable}
            focusable={inputEditable}
            onChangeText={val => setPhnNo(val)}
            maxLength={10}
          />
          <Text
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              backgroundColor: inputEditable
                ? appColors.primary
                : appColors.light_grey,
              borderRadius: 10,
              color: inputEditable ? appColors.white : appColors.black,
              borderWidth: 1,
              borderColor: appColors.dark_grey,
            }}
            onPress={() => navigateBack()}>
            Change
          </Text>
        </View>
        {!inputEditable ? (
          <Text
            style={{
              marginTop: 20,
              marginLeft: 40,
              color: appColors.black,
              alignSelf: 'flex-start',
            }}>
            OTP
          </Text>
        ) : (
          <View />
        )}
        {!inputEditable ? (
          <View style={{height: 60}}>
            <OtpInputs
              inputStyles={{
                backgroundColor: appColors.white,
                color: appColors.black,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginLeft: 8,
                textAlign: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowRadius: 5,
                shadowOffset: {width: 10, height: 10},
              }}
              handleChange={code => setOtpValue(code)}
              numberOfInputs={6}
              keyboardType="phone-pad"
              selectTextOnFocus={false}
              // onChangeText={val => setOTP(myOtp.concat(val))}
            />
          </View>
        ) : (
          <View />
        )}

        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginRight: 40,
          }}
          onPress={() => (seconds == 0 ? resendOtp() : '')}>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: 40,
              color: seconds == 0 ? appColors.primary : appColors.black,
            }}>
            {seconds == 0 ? 'Resend OTP' : `Retry in ${seconds} seconds`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onSend(myOtp)}>
          <Text style={{color: appColors.white}}>{t('Verify')}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welStyle: {
    color: appColors.primary,
    fontSize: 18,
    fontFamily: getFont.italicBold,
  },
  comeStyle: {
    color: appColors.black,
    fontSize: 18,
    fontFamily: getFont.italicBold,
    textAlign: 'center',
  },

  countryCodeStyle: {
    marginTop: 5,
    width: '80%',
    alignItems: 'flex-start',
    backgroundColor: appColors.white,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowRadius: 10,
    shadowOffset: {width: 4, height: 4},
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    width: '50%',
    color: appColors.black,
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 80,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
