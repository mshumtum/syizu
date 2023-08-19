import {
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
import {encrypted} from '../../utils/encDecData';
import {useDispatch, useSelector} from 'react-redux';
import {getOtp} from '../../redux/actions/action';
import {setLanguage, useTranslation} from 'react-multi-lang';
import {storeLang} from '../../utils/localStorage';
import auth from '@react-native-firebase/auth';

const Welcome = ({navigation, route}) => {
  const t = useTranslation();
  const {langId} = route.params;

  const otpData = useSelector(state => state.getOtp);
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const [phnNo, setPhnNumber] = useState('');
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signInWithPhoneNumber(phoneNumber, id, otp) {
    const phn = `+91${phoneNumber}`;
    console.log('Phone Number ==>', phn);

    auth().settings.appVerificationDisabledForTesting = true;

    const confirmation = await auth().signInWithPhoneNumber(phn);
    setConfirm(confirmation);

    console.log('Confirmation ===>', confirmation);

    confirmation
      ? navigation.navigate('OtpScreen', {
          phnNo: phnNo,
          confirm: confirmation,
          otp: otp,
          id: id,
          langId: langId,
        })
      : '';
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const callBack = (val, otp, id) => {
    console.log('Val==>', val, ' OTP===>', otp);

    // signInWithPhoneNumber(phnNo, id, otp);

    if (val === true) {
      console.log('UseSelector', otpData);
      navigation.navigate('OtpScreen', {
        phnNo: phnNo,
        otp: otp,
        id: id,
        langId,
      });
    }
  };

  const onSend = () => {
    if (phnNo.length < 10) {
      showToast('Mobile Number Invalid');
    } else {
      const payload = {
        mobileNumber: phnNo,
        languageCode: langId,
      };
      // const payload = encrypted(request);

      dispatch(getOtp({payload, callBack}));
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

  useEffect(() => {
    console.log('LangId==>', phnNo);
    if (langId == 1) {
      storeLang('en');
      setLanguage('en');
    } else if (langId == 2) {
      storeLang('hi');
      setLanguage('hi');
    } else if (langId == 3) {
      storeLang('pa');
      setLanguage('pa');
    }
  }, [otpData]);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={getImage('background')}
        style={styles.containerStyle}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <SyizuLogo />
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <Text style={styles.welStyle}>{t('Welcome')}</Text>
            {/* <Text style={styles.comeStyle}>come</Text> */}
          </View>
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
                width: 2,
                marginHorizontal: 8,
                backgroundColor: appColors.light_grey,
                alignSelf: 'center',
                height: '90%',
              }}>
              <Text></Text>
            </View>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="9999999999"
              onChangeText={val => setPhnNumber(val)}
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => onSend()}>
            <Text style={{color: appColors.white}}>{t('Send OTP')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => navigation.navigate('TermAndConditions')}>
          <Text
            style={{fontSize: 14, fontWeight: 'bold', color: appColors.black}}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welStyle: {
    color: appColors.primary,
    fontSize: 36,
    fontFamily: getFont.italicBold,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 5,
  },
  comeStyle: {
    color: appColors.black,
    fontSize: 36,
    fontFamily: getFont.italicBold,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 5,
  },

  countryCodeStyle: {
    marginTop: 15,
    width: '80%',
    alignItems: 'flex-start',
    backgroundColor: appColors.white,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowRadius: 10,
    shadowOffset: {width: 4, height: 4},
  },
  input: {
    height: 40,
    padding: 10,
    color: appColors.black,
  },
  buttonStyle: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 80,
    width: 200,
  },
});
