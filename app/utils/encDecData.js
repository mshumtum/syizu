import CryptoJS from 'react-native-crypto-js';

const secretKey = 'admin123';

export const decrypted = data => {
  console.log('dec Check==>', data);
  var bytes = CryptoJS.AES.decrypt(data, secretKey);

  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log('dec Check==>');
  const parsed = JSON.parse(originalText);
  console.log(parsed);
  return parsed;
};
export const encrypted = data => {
  console.log('====>', data);

  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
  ).toString();
  const jsonData = {encrypt: ciphertext};
  decrypted(ciphertext);
  return jsonData;
};
