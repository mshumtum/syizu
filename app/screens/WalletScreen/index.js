import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { getImage } from '../../utils/getImage';
import BackArrow from '../../assets/svg/BackArrow';
import { appColors } from '../../utils/appColors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMoney,
  createOrder,
  getCoin,
  getWallet,
  saveTransaction,
} from '../../redux/actions/action';
import RazorpayCheckout from 'react-native-razorpay';
// import {
//   CFCallback,
//   CFErrorResponse,
//   CFPaymentGatewayService,
// } from 'react-native-cashfree-pg-sdk';
// import {
//   CFDropCheckoutPayment,
//   CFEnvironment,
//   CFSession,
//   CFThemeBuilder,
// } from 'cashfree-pg-api-contract';
// var ccavenue = require('ccavenue');

// import AllInOneSDKManager from 'paytm_allinone_react-native';

import { Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const WalletScreen = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [coin, setCoin] = useState(0);
  const [coinList, setCoins] = useState(null);

  const dispatch = useDispatch();

  const [coins, setimages] = useState([
    { src: getImage('coin'), totalCoin: 1000, coinPrice: 100, key: '1' },
    { src: getImage('coin'), totalCoin: 2000, coinPrice: 200, key: '2' },
    { src: getImage('coin'), totalCoin: 3000, coinPrice: 300, key: '3' },
    { src: getImage('coin'), totalCoin: 4000, coinPrice: 400, key: '4' },
    { src: getImage('coin'), totalCoin: 5000, coinPrice: 500, key: '5' },
    { src: getImage('coin'), totalCoin: 6000, coinPrice: 600, key: '6' },
    { src: getImage('coin'), totalCoin: 7000, coinPrice: 700, key: '7' },
    { src: getImage('coin'), totalCoin: 8000, coinPrice: 800, key: '8' },
    { src: getImage('coin'), totalCoin: 9000, coinPrice: 900, key: '9' },
  ]);

  const handlePayment = (amount) => {
    // const paymentUrl = `phonepe://pay?amount=1.00&merchantId=BABAPGONLINE&orderId=123qwerty&redirectUrl=https://chat.virtualittechnology.com/payment`;
    // Linking.canOpenURL(paymentUrl)
    //   .then(supported => {
    //     if (supported) {
    //       return Linking.openURL(paymentUrl);
    //     } else {
    //       console.log('PhonePe app is not installed.');
    //       // Handle the case where the PhonePe app is not installed
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Error occurred:', error);
    //     // Handle the error here
    //   });

    addBalance(amount)
  };

  useEffect(() => {

    dispatch(getCoin({ callbackCoin }));
    dispatch(getWallet({ callbackWallet }));
  }, []);

  // useFocusEffect(() => {
  //   dispatch(getCoin({ callbackCoin }));
  //   dispatch(getWallet({ callbackWallet }));
  // }, [])
  const callbackWallet = val => {
    // console.log('Wallet ===> ', val);
    setBalance(val.data.walletPoints);
  };

  const callbackCoin = val => {
    console.log('Coins ===> ', val);
    setCoins(val.data);
  };

  const callbackAddPoint = val => {
    if (val?.data?.data?.instrumentResponse?.redirectInfo?.url) {
      Linking.openURL(val?.data?.data?.instrumentResponse?.redirectInfo?.url);
      console.log('Wallet ===> ', JSON.stringify(val));
      showToast('Payment initiated');
    } else {
      showToast('Payment failed');
    }

    // setBalance(val.data.walletPoints);
  };

  const addBalance = amount => {
    const payload = {
      amount: amount,
    };

    dispatch(addMoney({ payload, callbackAddPoint }));
  };

  // const razorpayOrder = async (price, coin) => {
  //   setCoin(coin);

  //   console.log('coin ==> ', coin);

  //   try {
  //     const session = new CFSession(
  //       'TEST44cca32c3c98aa5620149c72ec2bb0264860f578',
  //       'order_id',
  //       CFEnvironment.SANDBOX,
  //     );
  //     const theme = new CFThemeBuilder()
  //       .setNavigationBarBackgroundColor('#E64A19')
  //       .setNavigationBarTextColor('#FFFFFF')
  //       .setButtonBackgroundColor('#FFC107')
  //       .setButtonTextColor('#FFFFFF')
  //       .setPrimaryTextColor('#212121')
  //       .setSecondaryTextColor('#757575')
  //       .build();
  //     const dropPayment = new CFDropCheckoutPayment(session, null, theme);
  //     // const response = CFPaymentGatewayService.doPayment(dropPayment);

  //     console.log('Response payment ', dropPayment);
  //   } catch (e) {
  //     console.log(e.message);
  //   }

  //   // const payload = {
  //   //   amount: price * 100,
  //   //   currency: 'INR',
  //   //   receipt: 'recepoet##1233232',
  //   //   notes: {
  //   //     description: 'add coin',
  //   //     language: 'en',
  //   //   },
  //   // };

  //   // dispatch(createOrder({payload, orderCallback}));
  // };

  const orderCallback = val => {
    console.log('Order Id ', val);

    openPaytm(val.data.id, val, data.amount);

    openRazorPay(val.data.id, val.data.amount);
  };

  // const openMyPhonepePage = async () => {
  //   let operatingSystem = Constants.OS.ios; //or Constants.OS.android
  //   let sdk = await PhonePe.build(Constants.Species.native, operatingSystem);

  //   let merchantName = 'DummyMerchant';
  //   let imageURL = 'https://image.dummymerchant.com';
  //   //Any metadata to show on PhonePe's payment screen
  //   let metadata = [
  //     {
  //       Movie: 'Avengers',
  //     },
  //     {Seats: '3E, 4E, 5E'},
  //   ];

  //   sdk
  //     .openPaymentsPage(merchantName, context, null, imageURL, metadata)
  //     .then(response => {
  //       console.log('Payment was successful = ' + response);
  //     })
  //     .catch(err => {
  //       console.log('Payment failed with error = ' + err);
  //     });
  // };

  const openRazorPay = (orderId, price) => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_9LELf53DiV5m4t',
      order_id: orderId,
      amount: price,
      name: 'Syizu',
      theme: { color: appColors.primary },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        console.log(data);
        showToast('Payment add successfully');
        const payload = {
          orderId: data.razorpay_order_id,
          transactionId: data.razorpay_payment_id,
          coins: coin,
        };
        dispatch(saveTransaction({ payload, transactionCallback }));
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        showToast('Payment Cancel');
      });
    RazorpayCheckout.onExternalWalletSelection(data => {
      showToast(`External Wallet Selected: ${data.external_wallet} `);
    });
  };

  // const openPaytm = (orderId, amount) => {
  //   AllInOneSDKManager.startTransaction(
  //     orderId,
  //     mid,
  //     tranxToken,
  //     amount,
  //     callbackUrl,
  //     isStaging,
  //     appInvokeRestricted,
  //     urlScheme,
  //   )
  //     .then(result => {
  //       console.log('result', result);
  //       // handle result ..
  //     })
  //     .catch(err => {
  //       // handle error ..
  //     });
  // };

  const showToast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const transactionCallback = val => {
    dispatch(getWallet({ callbackWallet }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColors.white }}>
      {/* <ScrollView style={{marginBottom: 70}}> */}
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>Wallet</Text>
      </View>
      {/* <ImageBackground
          source={getImage('walletTopBack')}
          style={{alignContent: 'center', paddingVertical: 10}}
          resizeMode="stretch">
          <View style={styles.topViewInnerStyle}>
            <Text style={{color: appColors.black}}>Daily Limit</Text>
            <Text style={[styles.topTextBack, {width: 150}]}> Rs 0/1200</Text>
          </View>
          <View style={styles.topViewInnerStyle}>
            <Text style={{color: appColors.black}}>Weekly Limit</Text>
            <Text style={[styles.topTextBack, {width: 140}]}> Rs 0/6000</Text>
          </View>
          <View style={styles.topViewInnerStyle}>
            <Text style={{color: appColors.black}}>Monthly Limit</Text>
            <Text style={[styles.topTextBack, {width: 135}]}> Rs 0/30000</Text>
          </View>
        </ImageBackground> */}
      <Text
        style={[
          styles.headerTextStyle,
          { color: appColors.primary, marginTop: 20, marginLeft: 10 },
        ]}>
        Buy
        <Text style={{ color: appColors.black, fontWeight: 'normal' }}>
          {' '}
          Coin
        </Text>
      </Text>
      <FlatList
        nestedScrollEnabled
        data={coinList}
        style={{ paddingLeft: 5 }}
        renderItem={({ item, index }) => (
          <View
            // addBalance(item.totalCoin)
            // onPress={() =>
            //   navigation.navigate('MyCCAvanueScreen', {
            //     amount: item.coinPrice,
            //   })
            // }
            style={{
              flex: 1,
              backgroundColor: appColors.white,
              borderColor: appColors.grey,

              padding: 8,
            }}>
            <View style={styles.itemStyle}>
              <Image source={getImage('coin')} style={{ marginTop: 10 }} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 16,
                    marginTop: 10,
                    color: appColors.black,
                  }}>
                  {item.coins} Coin
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      textDecorationLine: 'line-through',
                    }}>
                    ₹{item.amount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 4,
                      color: appColors.primary,
                    }}>
                    ₹{item.dAmount}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                // onPress={() => razorpayOrder(item.amount, item.coins)}
                onPress={() => handlePayment(item.amount)}
                style={{
                  backgroundColor: appColors.primary,
                  borderRadius: 5,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: appColors.white,
                    fontSize: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* <Text
          style={[
            styles.headerTextStyle,
            {color: appColors.primary, marginTop: 10, marginLeft: 10},
          ]}>
          VIP
          <Text style={{color: appColors.black, fontWeight: 'normal'}}>
            {' '}
            Subscription
          </Text>
        </Text>

        <FlatList
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          data={coins}
          style={{paddingLeft: 5, margin: 8}}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: appColors.white,
                borderColor: appColors.grey,
                borderRadius: 10,
              }}>
              <Image source={getImage('vipOffers')} />
            </View>
          )}
        /> */}
      {/* </ScrollView> */}
      <View
        style={{
          backgroundColor: appColors.primary,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            color: appColors.white,
            fontWeight: 'bold',
            fontSize: 16,
            flex: 1,
          }}>
          Coin Balance
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: appColors.dark_primary,
            paddingLeft: 20,
          }}>
          <Image source={getImage('coin')} />
          <Text
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              color: appColors.white,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {balance} coins
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 16,
  },
  headerTextStyle: {
    fontSize: 20,
    color: appColors.black,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  topViewInnerStyle: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  topTextBack: {
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: appColors.transparent,
    color: appColors.black,
    marginLeft: 10,
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
