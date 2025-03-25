import CryptoJS from 'crypto-js';
import LZString from 'lz-string';

async function encryptJSON(jsonData: object, secretKey: string | CryptoJS.lib.WordArray) {
  try {
    // Validate input
    if (!jsonData || typeof jsonData !== 'object') {
      throw new Error('Input must be a valid JSON object');
    }

    // Stringify the JSON
    const jsonString = JSON.stringify(jsonData);

    // Compress the JSON string using LZ-String
    const compressedString = LZString.compressToBase64(jsonString);

    // Generate a 16-byte salt
    const salt = CryptoJS.lib.WordArray.random(16);

    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA256,
    });

    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the compressed string
    const encrypted = CryptoJS.AES.encrypt(compressedString, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Combine salt, iv, and encrypted data
    const combinedData = salt.concat(iv).concat(encrypted.ciphertext);

    // Convert to base64 and make URL-safe
    const base64Encoded = combinedData
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, '-') // Replace + with -
      .replace(/\//g, '_') // Replace / with _
      .replace(/=+$/, ''); // Remove trailing = padding

    // Ensure the result is under 2000 characters
    return base64Encoded.slice(0, 1990);
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}

// Corresponding decryption function
async function decryptJSON(encryptedString: string, secretKey: string | CryptoJS.lib.WordArray) {
  try {
    // Restore base64 padding and convert URL-safe characters back
    const base64String = encryptedString
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(encryptedString.length + ((4 - (encryptedString.length % 4)) % 4), '=');

    // Convert base64 back to WordArray
    const combinedData = CryptoJS.enc.Base64.parse(base64String);

    // Extract salt (first 16 bytes)
    const salt = CryptoJS.lib.WordArray.create(combinedData.words.slice(0, 4));

    // Extract IV (next 16 bytes)
    const iv = CryptoJS.lib.WordArray.create(combinedData.words.slice(4, 8));

    // Extract encrypted data (remaining bytes)
    const encryptedData = CryptoJS.lib.WordArray.create(combinedData.words.slice(8));

    // Derive key using the same method as encryption
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA256,
    });

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: encryptedData }),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    // Convert decrypted bytes to string
    const decryptedBase64 = decrypted.toString(CryptoJS.enc.Utf8);

    // Decompress using LZ-String
    const decompressedJsonString = LZString.decompressFromBase64(decryptedBase64);

    // Parse and return the original JSON object
    return JSON.parse(decompressedJsonString);
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}

export { decryptJSON, encryptJSON };
