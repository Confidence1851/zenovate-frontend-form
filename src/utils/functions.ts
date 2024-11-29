const CryptoJS = require('crypto-js');

export const redirectToProductForm = (id: string | number) => {
  const data = {
    "key": "selected_product",
    "value": [id]
  };
  return redirectToForm(data);
}

const redirectToForm = (data: object) => {
  const hash = btoa(encryptWithAES(data));
  const url = `${process.env.NEXT_PUBLIC_FORM_URL}\\redirect\\${hash}`;
  window.location.href = url;
}

export const decodeRedirectHash = (hash: string) => {
  const data = decryptWithAES(atob(decodeURIComponent(hash)));
  return data;
}


const encryptWithAES = (text: any) => {
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const secretIv = process.env.NEXT_PUBLIC_ENCRYPTION_IV;

  const Sha256 = CryptoJS.SHA256;
  const Hex = CryptoJS.enc.Hex;
  const Utf8 = CryptoJS.enc.Utf8;
  const AES = CryptoJS.AES;

  // Generate key and IV
  const key = Sha256(secretKey).toString(Hex).substr(0, 32);
  const iv = Sha256(secretIv).toString(Hex).substr(0, 16);

  // Encrypt data
  const encrypted = AES.encrypt(JSON.stringify(text), Utf8.parse(key), {
      iv: Utf8.parse(iv),
  }).toString();

  return encrypted;
}

const decryptWithAES = (ciphertext: string) => {
  const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const secretIv = process.env.NEXT_PUBLIC_ENCRYPTION_IV;
  

  const Sha256 = CryptoJS.SHA256;
  const Hex = CryptoJS.enc.Hex;
  const Utf8 = CryptoJS.enc.Utf8;
  const AES = CryptoJS.AES;

  // Generate key and IV
  const key = Sha256(secretKey).toString(Hex).substr(0, 32);
  const iv = Sha256(secretIv).toString(Hex).substr(0, 16);

  // Decrypt data
  const decrypted = AES.decrypt(ciphertext, Utf8.parse(key), {
      iv: Utf8.parse(iv),
  }).toString(Utf8);

  return JSON.parse(decrypted);
}
