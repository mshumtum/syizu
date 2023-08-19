import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../utils/appColors';
import BackArrow from '../../assets/svg/BackArrow';
import {encrypted} from '../../utils/encDecData';
import {useDispatch} from 'react-redux';
import {createUser} from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {getImage} from '../../utils/getImage';
import CancelButton from '../../assets/svg/CancelButton';
import SyizuLogo from '../../assets/svg/SyizuLogo';
import {useEffect} from 'react';

const CreateUser = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Select Gender');

  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  //   const [token,setToken] = useState('')
  const dispatch = useDispatch();

  const callBack = val => {
    console.log('Val==>', val);

    if (val === true) {
      navigation.pop();
      navigation.navigate('MyTabs', {screen: 'Home'});
    }
  };

  var id = '';

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      console.log('StoreData==>', value);
      if (value !== null) {
        const payload = {
          userName: username,
          dateOfBirth: date.toDateString(),
          gender: gender,
          userId: value,
        };
        console.log('createUserRequest===>', payload);
        dispatch(createUser({payload, callBack}));
      }
    } catch (e) {
      // error reading value
    }
  };

  const onContinueSignUp = () => {
    console.log('helo');

    if (username === '') {
      showToast('Please enter username');
    }
    // else if (email === '') {
    //   alert('Please enter email');
    // }
    else if (date === '') {
      showToast('Please enter Date of birth');
    } else if (gender === 'Select Gender') {
      showToast('Please select gender');
    }
    // else if (reg.test(email) === false) {
    //   alert('Email is Not Correct');
    //   console.log('Email is Not Correct');
    // }
    else {
      console.log('Signup');
      getId();
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

  const setGenderValue = val => {
    setGender(val);
    setGenderModalVisible(false);
  };

  // useEffect(() => {
  //   setDate();
  // }, []);

  return (
    <View style={styles.containerStyle}>
      {/* <ScrollView> */}
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>
          Create<Text style={styles.innerText}>{' Account'}</Text>
        </Text>
      </View>
      {/* <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.textStyle}>First Name</Text>
          <TextInput
            placeholder="Enter FirstName"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setFirstname(val)}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.textStyle}>Last Name</Text>
          <TextInput
            placeholder="Enter Lastname"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setLastname(val)}
          />
        </View> */}
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <SyizuLogo height={150} />
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={styles.textStyle}>Username</Text>
            <TextInput
              placeholder="Enter Username"
              placeholderTextColor={appColors.black}
              style={styles.inputText}
              onChangeText={val => setUsername(val)}
            />
          </View>
          {/* <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.textStyle}>E-mail</Text>
          <TextInput
            placeholder="Enter E-mail"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setEmail(val)}
          />
        </View> */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={styles.textStyle} onPress={() => setOpen(true)}>
              D.O.B.
            </Text>
            {/* <TextInput
            placeholder="Enter DOB(10-08-2000)"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setDob(val)}
          /> */}
            <TouchableOpacity
              style={[styles.inputText, {flexDirection: 'row', padding: 10}]}
              onPress={() => setOpen(true)}>
              <Text style={{flex: 1, color: appColors.black}}>
                {date != null ? date.toDateString() : ''}
              </Text>
              <Image
                source={getImage('calender')}
                style={{height: 24, width: 24, alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              maximumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                console.log('Date', date);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={styles.textStyle}>Gender</Text>
            <TouchableOpacity
              style={styles.inputText}
              onPress={() => setGenderModalVisible(true)}>
              <Text style={styles.genderOptionStyle}>{gender}</Text>
            </TouchableOpacity>

            {/* <TextInput
            placeholder="Male/Female"
            placeholderTextColor={appColors.black}
            style={styles.inputText}
            onChangeText={val => setGender(val)}
          /> */}
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onContinueSignUp()}>
            <Text style={{color: appColors.white}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </ScrollView> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={genderModalVisible}
        onRequestClose={() => {
          // this.closeButtonFunction()
        }}>
        <View
          style={{
            height: '80%',
            width: '90%',
            marginTop: 'auto',
            alignSelf: 'center',
            // alignItems: 'center',
            // justifyContent: 'center',
            borderColor: appColors.grey,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: appColors.white,
          }}>
          {/* <View style={{flexDirection: 'row'}}> */}
          <Text style={styles.selectGenderStyle}>Select Gender</Text>

          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Male')}>
            <Text style={styles.genderOptionStyle}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Female')}>
            <Text style={styles.genderOptionStyle}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Transgender')}>
            <Text style={styles.genderOptionStyle}>Transgender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Bigender')}>
            <Text style={styles.genderOptionStyle}>Bigender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Genderqueer')}>
            <Text style={styles.genderOptionStyle}>Genderqueer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Agender')}>
            <Text style={styles.genderOptionStyle}>Agender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Genderless')}>
            <Text style={styles.genderOptionStyle}>Genderless</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Non-binary')}>
            <Text style={styles.genderOptionStyle}>Non-binary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Cis Man')}>
            <Text style={styles.genderOptionStyle}>Cis Man</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Cis Woman')}>
            <Text style={styles.genderOptionStyle}>Cis Woman</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Trans Man')}>
            <Text style={styles.genderOptionStyle}>Trans Man</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Trans Woman')}>
            <Text style={styles.genderOptionStyle}>Trans Woman</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Third Gender')}>
            <Text style={styles.genderOptionStyle}>Third Gender</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Two-Spirit')}>
            <Text style={styles.genderOptionStyle}>Two-Spirit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOptionStyle}
            onPress={() => setGenderValue('Genderfluid')}>
            <Text style={styles.genderOptionStyle}>Genderfluid</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.back_color,
  },
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  innerText: {
    fontSize: 20,
    color: appColors.black,
    flex: 1,
    fontWeight: 'normal',
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
    margin: 30,
    alignItems: 'center',
  },
  selectGenderStyle: {
    fontSize: 18,
    color: appColors.black,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 20,
    marginTop: 20,
    // textAlign: 'center',
  },
  genderOptionStyle: {
    fontSize: 14,
    color: appColors.black,
    marginLeft: 10,
    // alignItems: 'center',
    padding: 8,
  },
});
