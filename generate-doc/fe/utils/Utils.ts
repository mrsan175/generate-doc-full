import CryptoJS from 'crypto-js';
import pako from 'pako';

interface DecryptFunction {
    (encryptedData: string): string | null;
}

export const decrypt: DecryptFunction = (encryptedData) => {
    if (!encryptedData) {
        return null;
    }
    const secretKey: string | undefined = process.env.EXPO_PUBLIC_KEY;
    if (!secretKey) {
        return null;
    }
    const [ivBase64, encryptedBase64] = encryptedData.split(':'); 
    const iv = CryptoJS.enc.Base64.parse(ivBase64); 
    const encrypted = CryptoJS.enc.Base64.parse(encryptedBase64);
    const key = CryptoJS.enc.Hex.parse(secretKey as string); 
    const decryptedBytes = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext: encrypted }), key, { iv: iv });
    if (!decryptedBytes || decryptedBytes.sigBytes === 0) {
        return null;
    }
    try {
        const decryptedArray = new Uint8Array(decryptedBytes.sigBytes);
        for (let i = 0; i < decryptedBytes.sigBytes; i++) {
            decryptedArray[i] = decryptedBytes.words[i >>> 2] >>> ((3 - (i % 4)) * 8) & 0xff;
        }
        const decompressedData = pako.inflate(decryptedArray);
        const decodedData = new TextDecoder().decode(decompressedData);
        return decodedData;
    } catch (error) {
        return null;
    }
};
