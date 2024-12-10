const crypto = require('crypto');

const encrypt = (data) => {
    const algorithm = 'aes-128-cbc';
    const encryptionKeys = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(encryptionKeys, 'hex');
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const ivBase64 = iv.toString('base64');
    const encryptedBase64 = encrypted.toString('base64');
    return ivBase64 + ':' + encryptedBase64;
}

module.exports = { encrypt };