import CryptoJS from "crypto-js";

const securityKey = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Define the decrypt function
export function decrypt(encryptedMessage, passKey = securityKey) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
        keySize: 48 / 4,
        iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray).init(
        keyBytes.words.splice(32 / 4),
        16
    );
    var decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf16LE);
}
// Define the encrypt function
export function encrypt(message, passKey = securityKey) {
    var keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
        keySize: 48 / 4,
        iterations: 1000,
    });
    var key = new (CryptoJS.lib.WordArray).init(keyBytes.words, 32);
    var iv = new (CryptoJS.lib.WordArray).init(
        keyBytes.words.splice(32 / 4),
        16
    );
    var data = CryptoJS.enc.Utf16LE.parse(message);
    var encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return encrypted.toString();
}