require('dotenv').config();
const crypto = require('crypto');

const ENCRYPTED_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 256-bit key
const ALGORITHM = 'aes-256-cbc';

function encrypt(plaintext) {

    const IV = crypto.randomBytes(16); // 128-bit
    const cipher_object = crypto.createCipheriv(ALGORITHM, ENCRYPTED_KEY, IV);

    let encrypted = cipher_object.update(plaintext, 'utf-8', 'base64'); 
    encrypted += cipher_object.final('base64');

    return {
        iv: IV.toString('base64'),
        encryptedData: encrypted
    };
}

function decrypt(iv, encryptedText) {
    const decipher_object = crypto.createDecipheriv(ALGORITHM, ENCRYPTED_KEY, Buffer.from(iv, 'base64'));
    let decrypted = decipher_object.update(encryptedText, 'base64', 'utf-8');
    decrypted += decipher_object.final('utf-8');
    return decrypted;
}

// Sample string
const plaintext = "Hello, World";
console.log("Original  : ", plaintext);

// Encrypt
const { iv, encryptedData } = encrypt(plaintext);
console.log("Encrypted : ", encryptedData);

// Decrypt
const decryptedData = decrypt(iv, encryptedData);
console.log("Decrypted : ", decryptedData);

module.exports = { encrypt, decrypt };
