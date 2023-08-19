import AsyncStorage from '@react-native-async-storage/async-storage';

export var sound = null;

export const storeToken = async value => {
  console.log('Token 2 ===>', value);
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

export const storeMusicPath = async value => {
  try {
    await AsyncStorage.setItem('musicPath', value);
  } catch (e) {
    // saving error
  }
};

export const getMusicPath = async setIsPlaying => {
  try {
    const value = await AsyncStorage.getItem('musicPath');

    if (value !== null) {
      console.log('path Stored==>', value);
      setIsPlaying(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const storeId = async value => {
  try {
    await AsyncStorage.setItem('id', value);
  } catch (e) {
    // saving error
  }
};
export const storeUsername = async value => {
  try {
    await AsyncStorage.setItem('username', value);
  } catch (e) {
    // saving error
  }
};

export const storeLang = async value => {
  try {
    await AsyncStorage.setItem('lang', value);
  } catch (e) {}
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    // console.log('Token==>', value);
    if (value !== null) {
    }
  } catch (e) {
    console.log('Token==>', e);
    // error reading value
  }
};

export const getId = async setUserId => {
  try {
    const value = await AsyncStorage.getItem('id');

    if (value !== null) {
      console.log('UserID Stored==>', value);
      setUserId(value);
    }
  } catch (e) {
    // error reading value
  }
};
export const getUsername = async setUsername => {
  try {
    const value = await AsyncStorage.getItem('username');
    console.log('UserID Stored==>', value);
    if (value !== null) {
      setUsername(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const getLang = async () => {
  try {
    const value = await AsyncStorage.getItem('lang');
    console.log('StoreLang==>', value);
    if (value !== null) {
    }
  } catch (e) {
    // error reading value
  }
};
